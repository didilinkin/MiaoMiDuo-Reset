import Vue from  'vue'

Vue.filter('orderState', function(str) {
	switch(str){
		case 'WAIT_BUYER_PAY':
        	return '等待买家付款'
        	break;
		case 'WAIT_SELLER_CONFIRM':
        	return '等待卖家确认'
        	break;
		case 'SELLER_CONSIGNED_PART':
        	return '卖家部分发货'
        	break;
		case 'WAIT_SELLER_SEND_GOODS':
        	return '等待卖家发货'
        	break;
		case ' WAIT_BUYER_CONFIRM_GOODS':
        	return '等待买家确认收货'
        	break;
		case 'TRADE_BUYER_SIGNED':
        	return '买家已签收'
        	break;
		case 'TRADE_FINISHED':
        	return '交易成功'
        	break;
		case 'TRADE_CLOSED':
        	return '付款以后用户退款成功，交易自动关闭'
        	break;
		case 'TRADE_CLOSED_BY_UDUI':
        	return '付款以前，卖家或买家主动关闭交易'
        	break;
        default :
        	return '未知状态';
	}
});

Vue.filter('imgFilter', function(url,num) {
	var jdUrl = url.indexOf('360buyimg');

	var rule = {
		1 : { jd :'n4' , zy : '@100w_100h_90Q' },
		2 : { jd :'n3' , zy : '@130w_130h_90Q' },
		3 : { jd :'n2' , zy : '@160w_160h_90Q' },
		4 : { jd :'n1' , zy : '@350w_350h_90Q' },
		5 : { jd :'n0' , zy : '@800w_800h_90Q' },
	}

	if (jdUrl == -1) {
		return url.replace('oss-cn-shanghai', 'img-cn-shanghai') + rule[num].zy;
	}else{
		return url.replace(/n\d/, rule[num].jd);
	}

});

Vue.filter('date', function(str) {
   let  myTime = {
            /**
             * 时间戳转换日期
             * @param <int> unixTime    待时间戳(秒)
             * @param <bool> isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)
             * @param <int>  timeZone   时区
             */
            UnixToDate: function(unixTime, isFull, timeZone) {
                if (typeof (timeZone) == 'number')
                {
                    unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
                }
                var time = new Date(unixTime);
                var ymdhis = "";
                ymdhis += time.getFullYear() + "-";
                ymdhis += (time.getMonth()+1) + "-";
                ymdhis += time.getDate() + " ";
                ymdhis += " " + time.getHours() + ":";
                ymdhis += time.getMinutes() + ":";
                ymdhis += time.getSeconds();
                return ymdhis;
            }
        }
        return myTime.UnixToDate(str)
});

Vue.filter('reverseFilter', function(arr) {
	console.log(arr);
	return arr.reverse();
});
