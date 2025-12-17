$(function () {

    resize();
    $(window).resize(function (event) {
        resize();
    });
    $('.xy_k3_tb').click(function () {
        $(this).toggleClass('on')
    })
    $('.xy_bottom .money li').click(function () {
        $(this).addClass('on').siblings().removeClass('on')
    })
    $('.tz_tips .tips').click(function () {
        $('.modal_play').addClass('on').show()
    })
    $(".list_tag .item").hide().eq($(".index_list .tit li.on").index()).show();
    $(".index_list .tit li").click(function () {
        $(this).addClass("on").siblings().removeClass("on")
        $(".list_tag .item").hide().eq($(".index_list .tit li.on").index()).show();
    })
$(".tag_color").each(function(){ if($(this).hasClass("on")) $("body").addClass($(this).attr("class")).removeClass("on").removeClass("tag_color")  })
// $("body").addClass("color2")
    $('.span_check').click(function () {
$(this).toggleClass("on")
        $(this).parents('.list').toggleClass('on')
    })
    $('.div_qh').click(function () {
        $(this).parents('.list').toggleClass('on')
    })
 $(".tag_color.color1").click(function (event) {
        event.stopPropagation();
        $(".icon_menu_drop").hide();
        $("body").addClass("color1").removeClass("color2")
    })
    $(".tag_color.color2").click(function (event) {
        event.stopPropagation();
        $('.icon_menu_drop').hide();
        $("body").addClass("color2").removeClass("color1")
    })
    $(".f_home").click(function () {
        $(".footer2").toggleClass("on")
       //$(".footer2").stop().slideToggle();
        $(".main_bottom").toggleClass("on")
        setTimeout(() => { getht()},500)
    })
    $(".sound,.div_input1 i.icon4").click(function () { $(this).toggleClass("on") })
    font();
    $(".ul_tag li,.tag_color").click(function () {  $(this).addClass("on").siblings().removeClass("on");    })
    $(".ul_tag2 li,.tz_label label,.slide").click(function () { $(this).toggleClass("on") })
    $(".tag_on").click(function () { $(this).toggleClass("on") })
    $(".kjtz_tab td").click(function () { $(this).parent().toggleClass("on") })
    document.body.addEventListener('touchstart', function () { });
    $(".span_yl").click(function () { $(".span_yl").toggleClass("on") })
    $(".span_lr").click(function () { $(".span_lr").toggleClass("on") })
    $("body,html").click(function (e) {
        var target = $(e.target);
        if (target.closest(".icon_menu2").length == 0) {
            $('.icon_menu_drop').stop().fadeOut()
        } 
    })
    $(".modal").click(function (e) {
        var target = $(e.target);
let that=$(this);
        if ($(this).find(".m_games_list").length > 0) return;
        if (target.closest(".modal_cont").length == 0) {
           that.stop().fadeOut();
           // $(".m_games_list").stop().slideUp()
        } 
    })
    $(".div_num").each(function () {
        $(this).children("span").eq(0).click(function () {
            var num = parseInt($(this).siblings(".input").val()) || parseInt($(this).siblings(".div_input1").find('input').val());
            if (num > 0) { 
                $(this).siblings("input").val(num - 1);
                $(this).siblings(".div_input1").find('input').val(num - 1);
            }
        })
        $(this).children("span").eq(1).click(function () {
            var num = parseInt($(this).siblings("input").val()) || parseInt($(this).siblings(".div_input1").find('input').val());
            $(this).siblings("input").val(num + 1);
            $(this).siblings(".div_input1").find('input').val(num + 1)
        })
    })
    $(".tz_list li").click(function () {
        getht()
    });
    $(".taggle_tit li").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
        $(this).parents(".taggle_tit").siblings(".taggle_items").find(".list").hide().eq($(this).index()).show();
    });

    $(".header h1").click(function () {
        $(".modal_games").stop().fadeIn();
        $(".m_games_list").stop().slideDown();

        $(".m_games_list").animate({ top: "30vh" }, 500);
        $(".ks_games_list").animate({ top: "30vh" }, 500);
    })
    $(".icon_menu_drop li").click(function () { 
        $(".icon_menu_drop").stop().hide();
    }) 
    $(".taggle_list2 .taggle_tit2 li").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
        $(this).parents(".taggle_list2").find(".taggle_items2").find(".item").hide().eq($(this).index()).show();
    })
    $(".bzzx_list ul li h3").click(function () { $(this).siblings(".bzzx_list_slide").stop().slideToggle(); })
    $(window).scroll(function () {
        if ($(window).scrollTop() > 50) $(".header").addClass("fixedon");
        else { $(".header").removeClass("fixedon"); }
    })
    $(".span_kj").click(function () { $(".modal_kjhm").addClass("on").stop().fadeIn(); });
    $(".modal .close").click(function () {
        if ($(this).parents(".modal").hasClass("modal_games")) {
            $(".m_games_list").animate({ top: "100%" }, 500);
            $(".ks_games_list").animate({ top: "100%" }, 500);
            $(".modal_games").fadeOut();
        }
        else if ($(this).parents(".modal").hasClass("modal_kjhm")) {
            $(this).parents(".modal").removeClass("on").fadeOut();
        }
        else {
            $(this).parents(".modal").stop().fadeOut();
        }
    })
    $(".list_tab table td,.lbl_check").click(function () { $(this).toggleClass("on") })
    $(".div_rad label").click(function () {
        $(this).addClass("in").siblings().removeClass("in")
    }) 

/*分红*/
	$(".ul_tag4-1 li").click(function() {
		$(this).toggleClass('on')
		if ($(this).hasClass("qzmd_all")) {
			if ($(this).hasClass('on'))
				$(this).siblings('li').addClass('on')
		}

	})



	$(".cpfh_tab .a_dele").click(function() {
		$(this).parents("tr").remove();
		return false
	})
	$(".cpfh_tj").click(function() {
		let p=$(this).parents('.modal').find('.cpfh_tab').find(".tab_scroll")
		let tr = p.find(".clone").clone(true).removeClass("clone")
		p.find("table").append(tr)
		p.scrollTop(1000000)
		return false;
	})
$(".modal_btn a").click(function(){
$(this).parents(".modal").hide();
})
	/*分红end*/
});

	function appendList(obj) {
		let str = "";
		let lis = obj.find('li')
		lis.each(function(e) {
			if ($(this).hasClass("qzmd_all")) {} else if ($(this).hasClass('on')) str += $(this).html()

		})
		$('.qzmd_textare').html(str)
	}
/*main*/
//


function checkAll(obj) {
    $(obj).parents(".item").find(".boll_list").find("li").addClass("on")
    $(obj).addClass("on").siblings().removeClass("on")
}
function checkBig(obj) {
    checkClear(obj);
    var num1 = $(obj).parents(".item").find(".boll_list").find("li").length / 2;
    $(obj).parents(".item").find(".boll_list").find("li").each(function (e) {
        if (e >= num1) $(this).addClass("on")
    })
    $(obj).addClass("on").siblings().removeClass("on")
}
function checkSmall(obj) {
    checkClear(obj);
    var num1 = $(obj).parents(".item").find(".boll_list").find("li").length / 2;
    $(obj).addClass("on").siblings().removeClass("on")
    $(obj).parents(".item").find(".boll_list").find("li").each(function (e) {
        if (e < num1) $(this).addClass("on")
    })
}
function checkSingular(obj) {
    checkClear(obj);
    if (parseInt($(obj).parents(".item").find(".boll_list").find("li").first().find(".i_boll").html()) % 2 == 0)
        $(obj).parents(".item").find(".boll_list").find("li:odd").addClass("on")
    else $(obj).parents(".item").find(".boll_list").find("li:even").addClass("on")
    $(obj).addClass("on").siblings().removeClass("on")
}
function checkDouble(obj) {
    checkClear(obj);
    if (parseInt($(obj).parents(".item").find(".boll_list").find("li").first().find(".i_boll").html()) % 2 == 0)
        $(obj).parents(".item").find(".boll_list").find("li:even").addClass("on")
    else $(obj).parents(".item").find(".boll_list").find("li:odd").addClass("on")
    $(obj).addClass("on").siblings().removeClass("on")
}
function checkClear(obj) {
    $(obj).parents(".item").find(".boll_list").find("li").removeClass("on")
    $(obj).addClass("on").siblings().removeClass("on");

}
function font() {
    var sw = $("body,html").width() < 750 ? $("body,html").width() : 750;
    var pw = $("body").hasClass("body1")?1080 : 750;

    var f = 100 * sw / pw;
    $('html').css('font-size', f + 'px');
}
setTimeout(() => { getht() },100)

function getht() {
    var main_bottom = $(".main_bottom").innerHeight()
    if ($(".tz_list .boll_list li.on").length > 0) {
        $(".main_bottom").show()
        $(".tz_list").height(getTzHeight() - main_bottom)
    }
    else {
       // $(".main_bottom").hide()
        $(".tz_list").height(getTzHeight()- main_bottom)
    }
}
/*call*/
function getTzHeight() {
    var ht = $(window).height();
    var main_head = $(".main_head").innerHeight() + 20
    var head_ht = $(".header").innerHeight()
    var main_top = $(".main_top").innerHeight()
    var main_menu = $(".main_menu").innerHeight()
    var tz_tit = $(".tz_tit").innerHeight()
    var tz_tips = $(".tz_tips").innerHeight()

    var footer = $(".footer2").innerHeight()
    var ht3 = ht - head_ht - main_top - main_menu - tz_tit - tz_tips - footer - main_head - 1
   
    return ht3

}
//
function resize() {
    var ht = $(window).height();
    font();
    var ht2 = $(".tz_list").innerHeight()

    var head_ht = $(".header").innerHeight()
    var main_top = $(".main_top").innerHeight()
    var main_menu = $(".main_menu").innerHeight()
    var tz_tit = $(".tz_tit").innerHeight()
    var tz_tips = $(".tz_tips").innerHeight()

    var footer = $(".footer").innerHeight()
    var ht3 = ht - head_ht - main_top - main_menu - tz_tit - tz_tips - footer -5

    $(".tz_list").height(ht3)

}