import sa from "sa-sdk-javascript";
import Base from "@/lib/ts/Base";

/**
 * 初始化
 */
export const init = () => {
    sa.init({
        server_url: Base.IS_PROD ? "https://dmp.nesc.cn:1443/sa?project=production" : "http://dmptest.nesc.cn:8107/sa?project=production",
        is_track_single_page: true, // 单页面配置，默认开启，若页面中有锚点设计，需要将该配置删除，否则触发锚点会多触发 $pageview 事件
        use_client_time: true,
        send_type: 'beacon',
        show_log: !Base.IS_PROD,
        heatmap: {
            //是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
            clickmap: 'default',
            //是否开启触达图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
            scroll_notice_map: 'not_collect'
        }
    });

    // 以异步加载 SDK 为例，神策 SDK 初始化完成，此时调用设置公共属性的方法，来保证之后的事件都有这两个属性。
    sa.registerPage({
        platform_type: "H5",
        business_type: '首页',
    });
    sa.use('PageLoad', {});
    // 全埋点
    sa.quick('autoTrack');
};
/**
 * 神策埋点
 * @param eventName 事件名称
 * @param properties 上报数据
 */
function addBuriedPoint(eventName: string, properties = {}) {
    sa.track(eventName, properties);
}
/**
 * page_view 页面浏览
 * @param properties
 */
export function pageView(properties = {}) {
    addBuriedPoint('page_view', properties);
}
