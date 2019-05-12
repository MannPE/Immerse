import { Component, State } from '@stencil/core';
import { Disposable } from '../../services/event-emitter';
import { ToastManager, Toast } from './toastManager';

@Component({
  tag: 'imr-toast',
  styleUrl: 'toast.scss',
  shadow: true
})

export class WordItem {
    @State() currentToast: Toast = null;
    
    private _listeners: Disposable[] = [];
    private _toastManager: ToastManager = ToastManager.instance;

    componentDidLoad() {
        this._listeners.push(
            this._toastManager.startEvent.on((toast) => {
                this.currentToast = {...toast};
                console.log("received toast", toast, this.currentToast)
            }),
            this._toastManager.finishEvent.on(() => {
                this.currentToast = null;
                console.log("toast ended");
            })
        );
    }

    render(): JSX.Element {
        return this.currentToast ?
        (
            <div class="immerse-toast">
                <span class="toast-message"> {this.currentToast.message} </span>
            </div>
        ): null;
    }
}

