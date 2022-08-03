import {requestAjaxEngine} from "./Index";
import {IStaticsItem, ITicketItem, IListRequest, ITicketListResponse, IStaticRequest} from "./types/Coupon";

/**
 * 获得可领优惠券列表
 * @param request
 */
export const getAvailableTicketList = (request: IListRequest) => {
    request.action = 45208;
    return requestAjaxEngine.getAjax<ITicketListResponse<ITicketItem>>(request);
}

/**
 * 获得我的优惠券列表
 * @param request
 */
export const getMyTicketList = (request: IListRequest) => {
    request.action = 45210;
    return requestAjaxEngine.getAjax<ITicketListResponse<ITicketItem>>(request);
}

/**
 * 查询优惠券数量
 * @param request
 */
export const getMyTicketStatics = (request: IStaticRequest) => {
    request.action = 45215;
    return requestAjaxEngine.getAjax<ITicketListResponse<IStaticsItem>>(request);
}
