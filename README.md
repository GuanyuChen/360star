#360前端星计划

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