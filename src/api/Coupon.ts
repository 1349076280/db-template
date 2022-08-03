import {requestAjaxEngine} from "./Index";
import {IStaticsItem, ITicketItem, IListRequest, ITicketListResponse, IStaticRequest} from "./types/Coupon";
// 请求接口列表在此处写接口 例如 getAvailableTicketList
/**
 * 获得可领优惠券列表
 * @param request
 */
export const getAvailableTicketList = (request: IListRequest) => {
    request.action = 45208;
    return requestAjaxEngine.getAjax<ITicketListResponse<ITicketItem>>(request);
}

