import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("postsProcessed")
export class PostsProcessedEntity {
    @PrimaryColumn()
    block: string;

    @Column()
    folderCid: string;

    @CreateDateColumn({ type: 'timestamp', default: 'now()' })
    createdAtTime: number;
}