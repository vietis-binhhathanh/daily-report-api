import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractBaseEntity } from '../../@base/entity/abstract-base-entity';
import { UserEntity } from './user.entity';
import { ProjectEntity } from './project.entity';

@Entity('tasks')
export class TaskEntity extends AbstractBaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  progress: number;

  @ManyToOne(
    type => UserEntity,
    user => user.tasks,
    { eager: true },
  )
  @JoinColumn({ name: 'user_id' })
  author: UserEntity;

  @ManyToOne(
    type => ProjectEntity,
    project => project.tasks,
    { eager: true },
  )
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;
}
