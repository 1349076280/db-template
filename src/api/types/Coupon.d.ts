import {AjaxEngineRequest} from "../Index";

interface IListRequest extends AjaxEngineRequest{
    /**
     * 手机号
     */
    mobile?: string;
    /**
     * 是否展示(1:展示;0:不展示)
     */
    isShow?: number;
    /**
     * 单页记录数
     */
    pageRowCount?: number;
    /**
     * 页码
     */
    pageNo?: number;
    /**
     * 用户手机登录凭证
     */
    userToken?: string;
    /**
     * 优惠券状态(0:下架;1:已上架;2:全部)
     */
    status?: number;
    /**
     * 使用状态(0:未使用;1:已使用;2:已失效)
     */
    isUsed?: number;
}
interface IStaticRequest extends AjaxEngineRequest{
    /**
     * 手机号
     */
    mobile?: string;
    /**
     * 用户手机登录凭证
     */
    userToken?: string;
    /**
     * 优惠券状态(0:下架;1:已上架;2:全部)
     */
    status?: number;
}
interface ITicketItem {
    val: string;
    coupon_id: number;
    use_end_date: string;
    type: string;
    full_value_reduction: string;
    count_all_perday: string;
    end_date: string;
    count_received: string;
    count_all: string;
    coupon_url: string;
    count_useable: number;
    coupon_product_id: string;
    cls: string;
    activity_id: number;
    count_one_total: string;
    status: string;
    begin_date: string;
    count_receivable: number;
    activity_name: string;
    coupon_name: string;
    count_one_perday: string;
    is_show: string;
    use_begin_date: string;
    lvl: string;
    coupon_url_type: string;
    count_left: string;
}
interface IStaticsItem {
    /**
     * 未使用数量
     */
    count_useable: number
    /**
     * 使用数量
     */
    count_used: number
    /**
     * 失效数量
     */
    count_loseused: number
    /**
     * 冻结数量
     */
    count_forzon: number
}
interface ITicketListResponse<T> {
    /**
     * 总数
     */
    rowcount: number;
    /**
     * 数据
     */
    rds: T[];
    fields: string[];
}
