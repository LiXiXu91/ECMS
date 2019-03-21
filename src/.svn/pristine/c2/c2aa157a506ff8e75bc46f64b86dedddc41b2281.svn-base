
function getEmojiMap() {
    var emojiTitle1 = "[微笑],[撇嘴],[色],[发呆],[得意],[流泪],[害羞],[闭嘴],[睡],[大哭],[尴尬],[发怒],[调皮],[呲牙],[惊讶],[难过],[囧],[抓狂],[吐],[偷笑],[愉快],[白眼],[傲慢],[困],[惊恐],[流汗],[憨笑],[悠闲],[奋斗],[咒骂],[疑问],[嘘],[晕],[衰],[骷髅],[敲打],[再见],[擦汗],[抠鼻],[鼓掌],[坏笑],[左哼哼],[右哼哼],[哈欠],[鄙视],[委屈],[快哭了],[阴险],[亲亲],[可怜],[菜刀],[西瓜],[啤酒],[咖啡],[猪头],[玫瑰],[凋谢],[嘴唇],[爱心],[心碎],[蛋糕],[炸弹],[便便],[月亮],[太阳],[拥抱],[强],[弱],[握手],[胜利],[抱拳],[勾引],[拳头],[OK],[跳跳],[发抖],[怄火],[转圈]";
    var emojiClass=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 31,32, 33, 34, 36, 37, 38, 39, 40, 41, 42,  44, 45, 46, 47, 48, 49,  50,51, 52, 54, 55, 56, 57, 60,62, 63, 64, 65, 66, 67, 68, 70,74, 75, 76, 78, 79, 80, 81, 82, 83, 84, 85, 89, 92, 93, 94, 95];
    var emojiTitle = emojiTitle1.split(',')
    var emojiList1 =[]
    for(var i=0;i<emojiClass.length;i++) {
        var a={
            className:'qqemoji' + emojiClass[i],
            title:emojiTitle[i]
        }
        emojiList1.push(a)
    }
    return emojiList1
}




var emoji = {
    emojiList:getEmojiMap()
    //相对应的字符串转换为字符串中的标签显示
    ,stringToHtml : function(str) {
        let reg1= /\[.+?\]/gi;  //找出对应[**]的字符串
        if(!str&&str!=0) {
            return str
        }
        let a = str.match(reg1);  //对应数组
        let b = []
        let emojiList = getEmojiMap();
        !!a&&emojiList.forEach(el=>{
            a.forEach(item=>{
                if(el.title == item){
                    b.push({
                        str1:new RegExp("(\\["+ item.substring(1, item.length-1) + "\\])(?!\\'\\>)"),
                        str2:"<img src='static/img_file/emojiBG.png' class= 'qqemoji " + el.className + "' title_name='"+ item +"'>"
                    })
                }
            })
        })
        for(let i=0;i<b.length;i++) {
            str = str.replace(b[i].str1,b[i].str2)
        }
        return str
    }
    // 字符串中的标签转换为相对应的字符串保存
    ,htmlToString : function(str) {
        let reg1= /<img\b.*?(?:\>|\/>)/gi;
        let reg2= /title_name\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/i;
        let a = str.match(reg1)
        let b = []
        !!a&&a.forEach(el=>{
            b.push({
                str1:el,
                str2:el.match(reg2)[1]
            })
        })
        for(let i=0;i<b.length;i++) {
            str = str.replace(b[i].str1,b[i].str2)
        }
        let reg3 = /<((?!(img|br)).)*?\/?>/g;
        let reg4 = /<\/+((?!(img|br)).)*?\/?>/g;
        let reg5 = /<((?!(img|br)).)*?\/?>/;
        str=str.replace(reg5,"");
        str=str.replace(reg4,"<br>");
        str=str.replace(reg3,"");
        return str
    }
}

module.exports = emoji;

