export interface EventListener<T> {
    (eventData: T): any;
}

export interface Disposable {
    /** 
     * Disposes of the object
    */
    dispose(): void;
}

/**
 * An interface to an event that can be subscribed to
 */
export interface Event<T> {
    /**
     * Adds an event listener (subscribes) to the event emitter
     * @param listener {EventListener<T>} The listener function that should be called each time the event is emitted.
     * @returns {Disposable} An object that contains single function (dispose) to unsubscribe.
     */
    on(listener: EventListener<T>): Disposable;

    /**
     * Unsubscribes from the event.
     * @param listener {EventListener<T>} The listener to be function removed. This should be the same listener that was used with the `on` method.
     */
    off(listener: EventListener<T>): void;

    /** 
     * Adds an event listener that will be automatically unsubscribed once the event is raised once.
     * @param listener {EventListener<T>} The listener function that should be called when the event is emitted.
     */
    once(listener: EventListener<T>): void;
}

/**
 * Implements a simple strong-typed event emitter
 */
export class EventEmitter<T> implements Event<T> {
    private _listeners: EventListener<T>[] = [];
    private _onceListeners: EventListener<T>[] = [];

    /**
     * Adds an event listener (subscribes) to the event emitter
     * @param listener {EventListener<T>} THe listener function that should be called each time the event is emitted.
     * @returns {Disposable} An object that contains single function (dispose) to unsubscribe.
     */
    on(listener: EventListener<T>): Disposable {
        if (typeof listener !== 'function') {
            throw new Error('Parameter must be a function.');
        }
        this._listeners.push(listener);
        return {
            dispose: () => this.off(listener)
        };
    }

    /**
     * Unsubscribes from the event.
     * @param listener {EventListener<T>} The listener to be function removed. This should be the same listener that was used with the `on` method.
     */
    off(listener: EventListener<T>): void {
        const listenderIndex = this._listeners.indexOf(listener);
        if (listenderIndex > -1) {
            this._listeners.splice(listenderIndex, 1);
        }

        const onceIndex = this._onceListeners.indexOf(listener);
        if (onceIndex > -1) {
            this._onceListeners.splice(onceIndex, 1);
        }
    }

    /** 
     * Adds an event listener that will be automatically unsubscribed once the event is raised once.
     * @param listener {EventListener<T>} The listener function that should be called when the event is emitted.
     */
    once(listener: EventListener<T>): Disposable {
        if (typeof listener !== 'function') {
            throw new Error('Parameter must be a function.');
        }

        const index = this._onceListeners.push(listener) - 1;
        return {
            dispose: () => this._onceListeners.splice(index, 1)
        };
    }

    /** 
     * Exposes a simpler event object with the ability to subscribe or unsubscribe but no ability to emit the event 
     * @returns {Event<T>} a simpler event instance with no emit capabilities
    */
    asEvent(): Event<T> {
        return {
            on: this.on.bind(this),
            off: this.off.bind(this),
            once: this.once.bind(this)
        };
    }

    /**
     * Emits (dispatches) the event to the event listeners
     * @param event The event data that is passed to the listeners
     */
    emit(event: T): void {
        // Call any general listeners 
        this._listeners.forEach((listener) => listener(event));

        // Clear the `once` queue 
        this._onceListeners.forEach((listener) => listener(event));
        this._onceListeners = [];
    }

    /** 
     * Pipes the events from this emitter to another emitter.
     * @param emitter The other emitter that should emit this emitter's events.
     * @returns {Disposable} An object that contains single function (dispose) to unsubscribe.
     */
    pipe(emitter: EventEmitter<T>): Disposable {
        return this.on((e) => emitter.emit(e));
    }
}