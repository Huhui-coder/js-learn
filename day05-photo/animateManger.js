;
(function (window, document, undefined) {
    var _aniQueue = [], //动画队列
        _baseUID = 0, //元素的UID基础值  
        _aniUpdateTimer = 13, //动画更新的时间
        _anilD = -1, //检测的进程 
        isTicking = false; //检测状态
    /**
     * option 参数
     * context 被操作的元素上下文
     * effect 动画效果的算法
     * time 效果的持续时间
     * starCss 元素的起始偏移量
     * css 元素的结束值偏移量
     **/
    window.animateManger = function (options) {
        this.context = options;
    }

    animateManger.prototype = {
        init: function () {
            this.start(this.context)
        },
        stop: function (_e) {
            clearInterval(_anilD);
            isTicking = false;
        },
        start: function (options) {
            if (options) {
                this.pushQueue(options);
                if (isTicking || _aniQueue.length === 0) {
                    return false;
                }
                this.tick();
                return true;
            }
        },
        tick: function () {
            var self = this;
            isTicking = true;
            _annilD = setInterval(function () {
                if (_aniQueue.length === 0) {
                    self.stop();
                } else {
                    var i = 0,
                        _aniLen = _aniQueue.length;
                    for (; i < _aniLen; i++) {
                        _aniQueue[i] && self.go(_aniQueue[i], i);
                    }
                }
            }, _aniUpdateTimer)
        },
        go: function (_options, i) {
            var n = this.now(),
                st = _options.startTime,
                ting = _options.time,
                e = _options.context,
                t = st + ting,
                name = _options.name,
                tPos = _options.value,
                sPos = _options.startValue,
                effect = _options.effect,
                scale = 1;
            if (n >= t) {
                _aniQueue[i] = null;
                this.delQueue();
            } else {
                tPos = this.aniEffect({
                    e: e,
                    ting: ting,
                    n: n,
                    st: st,
                    sPos: sPos,
                    tPos: tPos
                }, effect)
            }
            e.style[name] = name == " zIndex" ? tPos : tPos + 'px';
            this.goCallBack(_options.callback, _options.uid);
        },
        aniEffect: function (_options, effect) {
            effect = effect || 'linear';
            var _effect = {
                'linear': function (__options) {
                    var scale = (__options.n - __options.st) / __options.ting,
                        tPos = __options.sPos + (__options.tPos - __options.sPos) * scale;
                    return tPos;
                }
            }
            return _effect[effect](_options);
        },
        goCallBack: function (callback, u) {
            var i = 0,
                _aniLen = _aniQueue.length,
                isCallback = true;
            for (; i < _aniLen; i++) {
                if (_aniQueue[i].uid == u) {
                    isCallback = false;
                }
            }
            if (isCallback) {
                callback && callback()
            }
        },
        pushQueue: function (options) {
            var con = options.context,
                t = options.time || 1000,
                callback = options.callback,
                effect = options.effect,
                starCss = options.startCss,
                c = options.css,
                name = '',
                u = this.setUID(con);
            for (name in c) {
                _aniQueue.push({
                    "context": con,
                    "time": t,
                    "name": name,
                    "value": parseInt((starCss[name] || 0)),
                    "effect": effect,
                    "uid": u,
                    "callback": callback,
                    "startTime": this.now()
                })
            }
        },
        delQueue: function () {
            var i = 0,
                l = _aniQueue.length;
            for (; i < l; i++) {
                if (_aniQueue[i] === null) {
                    _aniQueue.splice(i, 1)
                }
            }
        },
        now: function () {
            return new Date().getTime();
        },
        getUID: function (_e) {
            return _e.getAttribute('aniUID');
        },
        setUID: function (_e, _v) {
            var u = this.getUID(_e);
            if (u) {
                return u;
            }
            u = _v || _baseUID++;
            _e.setAttribute('aniUID', u);
            return u;
        }

    };

})(window, document)