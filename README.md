# API
## 类(user)
### 登录(login) 
#### 参数
・id facebookId 

・pass 密码 

・platform 平台 
#### 处理说明
・先判断platform，如果是`fb`的话，表示facebook，就不需要check密码了，直接判断用户是不是存在，如果不存在则进行用户创建，如果用户存在则直接登录成功 

・如果不是facebook的话，则进行id和密码验证，进行登录处理 
#### 返回值
    {
        characters:[
            {id:1, level:1, amount:22},
            {id:2, level:2, amount:2},
            {id:4, level:4, amount:1},
            {id:6, level:2, amount:0}
        ],
        boxs:[
            {id:1,boxId:4,time:3400000,status:"unlock"},
            {id:2,boxId:3,time:0,status:"unlock"},
            {id:3,boxId:2,time:0,status:"lock"},
            null
        ],
        teams:[[1,2,4,5]],
        teamIndex:0,
        coin:1000000,
        gem:1000000,
        exp:2222,
        lv:11
    }
・characters 玩家拥有的卡牌，从cards表中获取，id是卡牌的card_id，也就是master_characters的id，level是卡牌等级，amount是卡牌的数量 

・boxs 玩家拥有的宝箱，从boxs表中获取，boxId是宝箱box_id，也就是master_boxs中的id， time是距离宝箱打开剩余的时间，status是宝箱状态，lock表示没有打开，unlock表示可以打开，或者正在解锁中。

・teams 玩家设置的站位组，是双重数组，因为以后会支持玩家设置多个站位组 

・teamIndex 玩家当前的展位组的索引 

・coin 金币 

・gem 宝石 

・exp 经验 

・lv 玩家等级 

### 打开宝箱(openBox) 
#### 参数
・id 宝箱的box_id 
#### 处理说明
・这里需要先判断宝箱是否可以打开，如果没有打开，或者正在解锁，则消耗宝石来打开宝箱，消耗的宝石数量根据解锁宝箱的剩余时间来换算，换算公式暂时定为5分钟1宝石。 
#### 返回值
    {
        playerModel:playerModel,
        contents:{
            gem:2,
            coin:300,
            cards:[
                {id:1, amount:22},
                {id:2, amount:2},
                {id:3, amount:10}
            ]
        }
    }
・playerModel 玩家信息，和login时的返回结果相同 

・contents 宝箱打开后获取的资源，只能获取到gem宝石，coin金币，cards卡牌这三种结果，每个宝箱可能获取到的资源在master_boxs中进行设定。 

