(function(){
    // tap切换
    var tapSwitch = (function () {
        var module = function (option) {
            var opt = {
                navs: $,
                contents: $,
                leaveHide: true
            };
            this.opt = $.extend(opt, option);
        };
        module.prototype.doSwitch = function () {
            var t = this;
            t.opt.navs.mouseenter(function () {
                var itemJq = $(this);
                if (!itemJq.hasClass("on")) itemJq.addClass("on");
            }).mouseleave(function (thisDom) {
                var itemJq = $(this);
                if (!itemJq.hasClass("select")) itemJq.removeClass("on");
                //离开当前区域隐藏导航，去除选中效果，即使被选中
                if (t.opt.leaveHide) {
                    itemJq.removeClass("on");
                    itemJq.removeClass("select");
                }
            }).click(function () {
                var itemJq = $(this);
                //把正在选中的效果去除，内容隐藏
                var selJq = t.opt.navs.filter(".select");
                var showContentJq = $("." + selJq.attr("content"));
                selJq.removeClass("select").removeClass("on");
                if (showContentJq) showContentJq.hide();
                //当前点击选中，绑定选中效果，显示内容
                itemJq.addClass("on").addClass("select");
                var contentJq = $("." + itemJq.attr("content"));
                contentJq.show();
            });
        };
        return module;
    })();

    // tap滑动
    var opt = {
        navs: $(".footer .nav-footer .nav-item"),
        contents: $(".footer .nav-footer .content-item"),
        leaveHide: false
    };

    var footer_ts = new tapSwitch(opt);
    footer_ts.doSwitch();
    opt.navs.eq(0).click();

    var top_ts = new tapSwitch({
        navs: $(".nav .nav_item"),
        contents: $(".nav .nav_content")
    });
    top_ts.doSwitch();
    //轮播
    $('.data').slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    });

    $(".lv1-box li").mouseenter(function () {
        var item = $(this);
        item.children(".dropdown-menu").show();
    }).mouseleave(function () {
        var item = $(this);
        item.children(".dropdown-menu").hide();
    });
    //去除价格重复
    (function () {
        function removeSameProduct(lis) {
            var items = $(lis);
            if (!items) return;
            items.each(function (index) {
                var itemJq = items.eq(index);
                var alt = itemJq.find("img").attr("alt");
                var imgItems = items.find('img[alt="' + alt + '"]');
                if (imgItems.length > 1) {
                    var liImtes = imgItems.parents("li");
                    var maxPrice = 0;
                    var maxItemLi = null;
                    liImtes.each(function (i) {
                        var itemLi = liImtes.eq(i);
                        var priceStr = liImtes.eq(i).find(".price").html();
                        var price = parseFloat(priceStr.trim().substring(1));
                        if (maxPrice <= 0 || price > maxPrice) {
                            maxPrice = price;
                            if (maxItemLi) maxItemLi.remove();
                            maxItemLi = itemLi;
                            return;
                        } else {
                            itemLi.remove()
                        }
                    });
                }
            });
        }

        function removeItem(productBox) {
            var products = $(productBox).find(".good_item");
            if (!products || products.length <= 0) {
                var contentJq = $(productBox).parents(".also_like");
                contentJq.remove();
            }
        }
        removeItem("#carousel-product");
        removeItem("#carousel-product2");
        removeSameProduct("#carousel-product li");
        removeSameProduct("#carousel-product2 li");
    })();
    //导航
    $(".lv1-box li").mouseenter(function () {
        var item = $(this);
        item.children(".dropdown-menu").show();
    }).mouseleave(function () {
        var item = $(this);
        item.children(".dropdown-menu").hide();
    });
    //移除导航
    if ($('.nav_body_1 .detail-box[item-name*="Toys"]')) $('.nav_body_1 .detail-box[item-name*="Toys"]').remove();
    if ($('.nav_body_1 .detail-box[item-name*="Outdoor"]')) $('.nav_body_1 .detail-box[item-name*="Outdoor"]').remove();
    if ($('.nav_body_1 .detail-box[item-name*="garden"]')) $('.nav_body_1 .detail-box[item-name*="garden"]').remove();
    // $('.nav_body_2 .home-garden-1').html($('.nav_body_1 .detail-box[item-name="Home garden"]'));
    // $('.nav_body_3 .sports-outdoors-1').html($('.nav_body_1 .detail-box[item-name="Sport outdoor"]'));
    if ($('.nav_body_1 .detail-box[item-name="Other"]')) $('.nav_body_1 .detail-box[item-name="Other"]').remove();
    //移除留言样式
    //if($("#reviewswidget style"))$("#reviewswidget style").remove();
    //设置留言板高度
    window.addHeight = setInterval(function () {
        var ft=document.getElementById("feedbacktable");
        if (ft) {
            ft.style.height = "450px";
            if (window.addHeight) clearInterval(window.addHeight);
        }
    }, 1000);
    //放大框大小
    var x_zoom=500;
    var y_zoom=500;
    //ipad等比例缩小
    if(navigator.userAgent.indexOf("iPad") != -1){
        x_zoom=300;
        y_zoom=300;
        $("body").css("zoom","0.7");    
    }  
     // 图片放大
    $(document).ready(function () {
        $(".jqzoom").imagezoom({
            xzoom: x_zoom,
            yzoom: y_zoom
        });
        $("#thumblist li a").click(function () {
            $(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
            $(".jqzoom").attr('src', $(this).find("img").attr("mid"));
            $(".jqzoom").attr('rel', $(this).find("img").attr("big"));
        }).eq(0).click();
    });
    //回车查询 
    $("#ship_zip").keydown(function(even) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13)  $("#ship_btn").click();
    });


})();