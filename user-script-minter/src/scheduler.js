import * as db from 'idb-keyval';
import * as daysjs from 'dayjs';
import {LocationError, WorkerError} from './exception';

export class Job {
    constructor(name, worker, timeSpan) {
        this.name = name;
        this.worker = worker;
        this.timeSpan = timeSpan;
        this.nextExecution = this.calcNextExecution();
        this.previousExecution = null;
        this.isChangingLocation = false;
    }

    calcNextExecution() {
        return daysjs().add(this.timeSpan, 'ms').toDate();
    }

    get delay() {
        return daysjs(this.nextExecution).diff(daysjs());
    }
}

export class Scheduler {
    constructor() {
        this.jobs = {};
        this.executors = [];
    }

    async addWorker(name, worker, timeSpan) {
        if (!this.jobs[name])
            this.jobs[name] = new Job(name, worker, timeSpan);
        else {
            this.jobs[name].worker = worker;
        }
    }

    async save() {
        await db.set('jobs', this.jobs);
    }

    async load() {
        const storedJobs = await db.get('jobs');
        if (storedJobs) {

            Object.keys(storedJobs).map(key => {
                const model = new Job();
                return Object.assign(model, storedJobs[key]);
            }).forEach((job) => {
                this.jobs[job.name] = job;
            });
            return true;
        }

        return false;
    }

    async executeJob(job) {
        try {
            job.previousExecution = job.nextExecution;
            job.nextExecution = job.calcNextExecution();
            await this.save();
            this.isChangingLocation = job.worker.run();
        } catch (ex) {
            if (ex instanceof LocationError) {
                job.nextExecution = job.previousExecution;
                await this.save();
                this.isChangingLocation = true;
                location = job.worker.location;
                
            }
            else if (ex instanceof WorkerError) {
                console.info(`Skipping execution due to worker error: ${ex}`);
            }
            else {
                console.error(`Failed ${job.name} execution, ex: ${ex}`);
            }
        }
        finally {
            console.log(`Executed ${job.name} prev: ${job.previousExecution} next: ${job.nextExecution}`);
            if(!this.isChangingLocation)
                this.run();
        }
    }

    run() {
        const jobToExecute = Object.keys(this.jobs)
            .map(key => this.jobs[key])
            .reduce((min, job) => {
                return job.delay < min.delay ? job : min;
            });
        console.log(`Scheduled ${jobToExecute.name} on: ${jobToExecute.nextExecution}`);
        setTimeout(async (job) => {
            await this.executeJob(job);
        }, jobToExecute.delay, jobToExecute);

    }
}