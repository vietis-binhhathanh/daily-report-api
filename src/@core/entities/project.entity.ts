import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractBaseEntity } from '../../@base/entity/abstract-base-entity';
import { TaskEntity } from './task.entity';

@Entity('projects')
export class ProjectEntity extends AbstractBaseEntity {
  @Column()
  customer: string;

  @Column()
  name: string;

  @Column({ name: 'mail_group' })
  mailGroup: string;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ default: null })
  manager: number | null;

  @OneToMany(
    type => TaskEntity,
    task => task.project,
  )
  tasks: TaskEntity[];
}
