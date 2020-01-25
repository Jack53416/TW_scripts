import * as db from 'idb-keyval';
import * as daysjs from 'dayjs';

export class Job {
    constructor(name, worker, timeSpan) {
        this.name = name;
        this.worker = worker;
        this.timeSpan = timeSpan;
        this.nextExecution = this.calcNextExecution();
        this.previousExecution = null;
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
        if(!this.jobs[name])
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
            job.worker.run();
        } catch(ex){
            console.error(`Failed ${job.name} execution, ex: ${ex}`);
            job.nextExecution = job.previousExecution;
            await this.save();
            location = job.worker.location;
        }
        
    }

    run() {
        Object.keys(this.jobs).forEach((key) => {
            const job = this.jobs[key];
            console.log(`${job.name}: ${job.delay}`);
            this.executors.push(setTimeout(async (job) => {await this.executeJob(job);}, job.delay, job));
        });
    }
}