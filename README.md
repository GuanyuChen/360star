[TOC]
# 360前端星计划
## JS实现“21点”扑克牌小游戏
### 设计思路
整体采用正常的项目文件结构  
- images 需要用到的图片  
- scripts 需要用到的js文件   
- styles 需要用到的css文件
- index.html 项目主体页面  

并采用响应式设计，对iphone、iPad及正常Android机型进行了适配
#### 主体页面

最顶级div为content，有两个子div，start和game，分别代表开始界面和游戏界面。

game有三个子div，marter，player，和msg，分别代表庄家，玩家和消息区；消息区也承担着功能区的作用。  

#### 样式文件
css文件有两个，index.css和mobile.css;

index.css控制PC端的样式布局,mobile.css对移动端进行适配,达到响应式布局的效果。
#### js文件
由于功能较简单，所以并没有对js代码进行模块化的拆分，只是一个文件。

完全采用原生js实现，在开发过程中，应用了原型链以及闭包等特性。最终因为设计思路的修改，并没有应用那段代码,而是作为对js高级特性应用的练习保留下来

    // 自定义删除数组元素方法
    // 在Array对象的原型上添加find方法，寻找指定元素在数组中的位置
    Array.prototype.find = function(tem){
        for(var i=0;i<this.length;i++){
            if (this[i] == tem) {
                return i;
            }
        }
        return -1;
    }
    // 在Array对象的原型上添加remove方法，按照find方法返回的索引，使用splice方法将指定元素删除
    Array.prototype.remove = function(tem){
        var i = this.find(tem);
        if (i > -1) {
            this.splice(i, 1);
            return this[i];
        }
    }

    delete tem[de]; // 利用delete操作符将发出的牌删除，把该位置的值赋为undefined，因为要保证数组长度不变

### 问题分析
+ 在没有UI设计图的情况下，页面设计占了整个开发过程的30%以上  
+ 功能至上，可能会有一些冗余的代码  
+ 由于功能较简单，所以对移动端只进行了布局的重新适配，而没在功能上有什么创新  
### 经验归纳
+ 设计能力对于一个前端人员来说也是不可或缺的，应该兼顾学习
+ 在功能实现之后，更重要的一步是代码的优化及复用
### 总结
> 纸上得来终觉浅，绝知此事要躬行。  

附：[Github][src]  
[src]:https://github.com/GuanyuChen (本人的Github)
