//默认，文本，输入框，图片文字，图片，通知样式，维护公告,html
export type DialogType = 'default' | 'text' | 'input' | 'imgText' | 'img' | 'informStyle' | 'systemNotice' | 'html';

export type DialogOptions =
  {
    type?:string;
    /**
     * 显示的标题
     */
    title?: string;
    /**
     * 显示的消息  加/n（兼容\n）换行
     */
    message?: string;
    /**
     * 文字对齐样式  默认左   left center right
     */
    messageAlign?:string;
    /**
     * 显示的宽度 80  百分比最大为100
     */
    width?: number | string;
    /**
    * 幕布 true false
    */
    mask?: boolean;
    /**
    * 是否展示确认按钮 true false
    */
    showConfirmButton?: boolean;
    /**
   * 确认按钮颜色
   */
    confirmButtonColor?: string;
    /**
     * 确认按钮文本
     */
    confirmButtonText?: string;

    /**
    * 是否展示取消按钮 true false
    */
    showCancelButton?: boolean;
    /**
   * 取消按钮文本
   */
    cancelButtonText?: string;
    /**
   * 取消按钮颜色
   */
    cancelButtonColor?: string;
    /**
     * 关闭回调
     */
    onClose?: Function;
    /**
     * 确认回调
     */
    onClick?: Function;

  };
export interface NeDialogApi{
    show(options: DialogOptions): void;
}
