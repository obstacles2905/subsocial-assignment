import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")
export class PostsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 48 })
    ownerId: string;

    @Column()
    spaceId: string;

    @Column({ nullable: true })
    body: string;

    @Column('text', { nullable: true, array: true })
    tags: any[];

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    syncedBlock: string;

    @Column({ nullable: true })
    syncedContentId: string;

    @CreateDateColumn({ type: 'timestamp', default: 'now()' })
    createdAtTime: number;
}