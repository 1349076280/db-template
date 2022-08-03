export type ToastPosition = 'top' | 'middle' | 'bottom';

export type ToastOptions = {
    /**
     * 显示的消息
     */
    message?: string;
    /**
     * 关闭回调
     */
    onClose?: () => void;
    /**
     * 打开窗口回调
     */
    onOpened?: () => void;
    /**
     * 停留时长
     */
    duration?: number;
    /**
     * 显示类型
     */
    position?: ToastPosition;
};
export interface NeToastApi {
    show(message: string, options?: ToastOptions) : void;
}
