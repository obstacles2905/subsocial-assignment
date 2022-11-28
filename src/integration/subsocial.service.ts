import { PostsRepository } from "../posts/posts.repository";
import { PostsProcessedRepository } from "../posts/postsProcessed.repository";
import { SubsocialApi } from "@subsocial/api";
import { PostsEntity } from "../posts/posts.entity";
import { PostsProcessedEntity } from "../posts/postsProcessed.entity";
import { PostsService } from "../posts/posts.service";
import { Cron } from "@nestjs/schedule";
import { Injectable, Logger } from "@nestjs/common";

export interface ISubsocialService {
    processIpfsMessage(posts: PostsEntity[]): Promise<PostsProcessedEntity>
}

@Injectable()
export class SubsocialService implements ISubsocialService {
    private readonly logger = new Logger(SubsocialService.name);
    private api: any;

    private readonly authHeader: string;
    private readonly substrateNodeUrl: string;
    private readonly ipfsNodeUrl: string;

    constructor(
        private postsRepository: PostsRepository,
        private postsProcessedRepository: PostsProcessedRepository,
        private postsService: PostsService
    ) {
        this.authHeader = process.env.SUBSOCIAL_AUTH_KEY;
        this.substrateNodeUrl = process.env.SUBSTRATE_NODE_URL;
        this.ipfsNodeUrl = process.env.IPFS_NODE_URL;

        this.init();
    }

    async init() {
        this.api = await SubsocialApi.create({
            substrateNodeUrl: this.substrateNodeUrl,
            ipfsNodeUrl: this.ipfsNodeUrl
        });
        this.api.ipfs.setWriteHeaders({
            authorization: 'Basic ' + this.authHeader
        });
    }

    @Cron("*/12 * * * * *")
    async processIpfsMessage(): Promise<PostsProcessedEntity> {
        this.logger.verbose("Process IPFS message CRON works");
        const posts: PostsEntity[] = await this.postsService.getPostsUnprocessed();

        if (posts.length === 0) {
            this.logger.verbose('No new posts found');
            return;
        }

        // const api = await SubsocialApi.create({
        //     substrateNodeUrl: this.substrateNodeUrl,
        //     ipfsNodeUrl: this.ipfsNodeUrl
        // });
        // api.ipfs.setWriteHeaders({
        //     authorization: 'Basic ' + this.authHeader
        // });

        const contents = posts.map(post => post.id.toString());

        const syncedContentIds = [];
        let folderCid = null;

        for await (const result of this.api.ipfs.client.addAll(contents, { wrapWithDirectory: true })) {
            if (result.path !== '') {
                syncedContentIds.push(result.cid.toString())
            } else {
                folderCid = result.cid.toString()
            }
        }

        const substrateApi = await this.api.substrateApi;
        const blockStruct = await substrateApi.rpc.chain.getHeader();
        const block = blockStruct.number.toString();

        posts.forEach(async (post, index) => {
            await this.postsRepository.update({id: post.id}, {
                syncedContentId: syncedContentIds[index],
                syncedBlock: block
            });
        });

        return await this.postsProcessedRepository.save({ block, folderCid })
            .finally(() => {
                this.logger.verbose(`Successfully processed ${posts.length} posts`);
            })
    }
}