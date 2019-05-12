import { EventEmitter, Event } from "../../services/event-emitter";

export class Toast {
    message: string;
    duration: number;
}

export class ToastManager {
    private _messageQueue: Toast[] = [];
    private _startToastEmitter = new EventEmitter<Toast>();
    private _finishEventEmitter = new EventEmitter<any>();
    private static __instance: ToastManager;

    get startEvent(): Event<Toast> {
        return this._startToastEmitter.asEvent();
    }

    get finishEvent(): Event<any> {
        return this._finishEventEmitter.asEvent();
    }

    public enqueue(toast: Toast): void {
        if (!toast) return;
        const start: boolean = this._messageQueue.length === 0;
        this._messageQueue.push(toast);
        if (start) {
            this._processQueue();
        }
    }

    private _processQueue(): void {
        const toast: Toast = this._messageQueue[0];
        if (!toast) {     //finishedProcessingTheQueue 
            this._finishEventEmitter.emit({});
            return;
        }
        this._processToast(toast, () => {
            this.removeToastFromQueue(toast);
            this._processQueue();
        });
    }

    private _processToast(toast: Toast, afterLoad: Function) {
        this._startToastEmitter.emit(toast);
        setTimeout(() => {
            afterLoad(); 
        },
        toast.duration);
    }

    private removeToastFromQueue(toast) {
        let index = this._messageQueue.indexOf(toast);
        if (index >= 0)
            this._messageQueue.splice(index, 1);
    }

    static get instance(): ToastManager {
        if (!ToastManager.__instance) {
            ToastManager.__instance = new ToastManager();
        }
        return ToastManager.__instance;
    }

}