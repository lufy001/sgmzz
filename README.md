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
        lv:11,
        versions:{
            master_boxs:1,
            master_characters:1,
            master_level:1,
            master_skills:1
        },
        loginBonusCalled:1，
        loginBonusCount:3,
        lastStageId:100002
    }
・characters 玩家拥有的卡牌，从cards表中获取，id是卡牌的card_id，也就是master_characters的id，level是卡牌等级，amount是卡牌的数量 

・boxs 玩家拥有的宝箱，从boxs表中获取，boxId是宝箱id，time是距离宝箱打开剩余的时间，status是宝箱状态，lock表示没有打开，unlock表示可以打开，或者正在解锁中。

・teams 玩家设置的站位组，是双重数组，因为以后会支持玩家设置多个站位组 

・teamIndex 玩家当前的站位组的索引 

・coin 金币 

・gem 宝石 

・exp 经验 

・lv 玩家等级  

・versions 各个master数据的版本，用户从服务器上获取的master数据会连同它们的版本一起保存到本地，之后通过对比来更新数据，如果不需要更新数据，则不会再次进行通信从服务器上获取 

・loginBonusCalled 登录奖励是否已经领取

・loginBonusCount 一个周期内登录奖励领取次数

・lastStageId 最后通过的master_stages的id

### 获取玩家信息(getPlayer) 
#### 参数
・id 玩家id   
#### 处理说明
・点击排行榜等地方后，为了显示玩家的信息，需要从服务器上获取玩家的部分信息 
#### 返回值
    {
        id:1,
        name:"lufy",
        team:[
            {id:1, level:1},
            {id:2, level:2},
            {id:4, level:4},
            {id:6, level:2}
        ],
        cup:300,
        maxCup:4000,
        lv:11
    }

・id 玩家id。

・name 玩家昵称。

・team 玩家当前所使用的卡牌组合 

・cup 玩家奖杯数  

・maxCup 玩家奖历史最高杯数  

・lv 玩家等级

### 更新卡牌组设定(setTeams) 
#### 参数
・teams 玩家设置的站位组，例:[[1,2,4,5]] 

・teamIndex 玩家当前的卡牌站位组的索引 
#### 处理说明
・玩家设置了新的卡牌组后，会通知服务器更新 
#### 返回值
    {
    }



### 解锁宝箱(unlockBox) 
#### 参数
・id 宝箱的id,boxs表的id 
#### 处理说明
・每位玩家最多可以同时拥有4个宝箱，宝箱最开始的状态是lock，当玩家选择进行解锁后，状态变为unlock，并开始进入倒计时解锁，倒计时结束后可以随时打开宝箱，同一时间只能解锁一个宝箱，所以需要验证一下是否有其他宝箱正在解锁。解锁需要的时间可以从master_boxs中获取，boxs中需要记录解锁开始的时间，然后算出解锁宝箱的剩余时间。 
#### 返回值
    {
        boxs:[
            {id:1,boxId:4,time:3400000,status:"unlock"},
            {id:2,boxId:3,time:0,status:"unlock"},
            {id:3,boxId:2,time:0,status:"lock"},
            null
        ]
    }
・boxs 宝箱状态，和login时的boxs相同 

### 广告解锁宝箱(adUnlockBox) 
#### 参数
・id 宝箱的id,boxs表的id 
#### 处理说明
・观看视频广告可以减少解锁宝箱所需的时间，暂定观看一次减少1小时，每天可以观看20次。 
#### 返回值
    与unlockBox的返回值相同

### 打开宝箱(openBox) 
#### 参数
・id 宝箱的id 
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

## 类(master)
### 获取数据(getList) 
#### 参数
・keys 需要获取的数据的name，例如["master_skills","news"] 
#### 处理说明
・这些数据是游戏的基本数据，通过参数中的keys来获取相应的数据
#### 返回值
    {
        master_characters:[],
        master_skills:[],
        master_boxs:[],
        master_level:[],
        news:[
            {id:1, title:"111", message:"0110test"},
            {id:2, title:"222", message:"22220test"},
            {id:3, title:"333", message:"33333test"}
        ],
        chapters:[
            {id:100, title:"huang jin zhi luan",stages:[
                {id:100001,title:"ying chuan zhi zhan",map:1,
                enemys:[
                    [{id:1,level:5},{id:2,level:5,isBoss:1},{id:3,level:5}],
                    [{id:2,level:5},{id:3,level:5,isBoss:1},{id:1,level:5}]
                ]}
            ]}
        ],
    }
・把每个master表中的所有数据转换成json返回  

## 类(card)
### 卡牌升级(levelUp) 
#### 参数
・id 卡牌id，cards表中的id 
#### 处理说明
・卡牌升级需要消耗卡牌和金币，消耗的卡牌数量和金币数量在master_level表中设定，所以需要验证升级条件是否满足
・升级卡牌时玩家也会得到经验，获取的经验暂定为：卡牌升级前的等级x10
#### 返回值
    与login的返回值相同 

## 类(shop)
### 购买(buy) 
#### 参数
・id master_shop里的id 
#### 处理说明
・最初商品只有宝箱，金币两种，消耗宝石，获得宝箱或者金币，如果是宝箱，则直接打开宝箱，把宝箱里的东西返回给客户端
#### 返回值
    {
        playerModel:playerModel，
        contents:{
            coin:300,
            cards:[
                {id:1, amount:22},
                {id:2, amount:2},
                {id:3, amount:10}
            ]
        }
    }
・playerModel 玩家信息，和login时的返回结果相同 

・contents 购买宝箱时宝箱中的资源，宝箱可能获取到的资源在master_boxs中进行设定。如果是购买金币的话，就没有cards了。 

## 类(game)
### 单人战斗结束(sendSingleResult) 
#### 参数
・stageId master_stages表中的id
#### 处理说明
・单人战斗只有胜利的时候才进行通信，获胜后能得到宝箱，首次获胜会获取少量宝石，只能获取一次，获取的宝石数量从master_stages中获取 
#### 返回值
    {
        playerModel:playerModel,
        boxId:1,
        gem:2
    }
・playerModel 玩家信息，和login时的返回结果相同 

・boxId 新获取的宝箱,新宝箱已经放到playerModel里了，这里的boxId是为了在战斗结果画面中显示。 如果没有获取新宝箱，则boxId为0。

・gem 获取的个数。 

### 搜寻对手准备(matchStart) 
#### 参数
・无
#### 处理说明
・将自己的id添加到battle_match表中 
#### 返回值
    {
    }

### 获取对战的对手id(getMatchTarget) 
#### 参数
・无
#### 处理说明
・查询battle_match_ready表，找出自己的对战配对数据 
#### 返回值
    {
        targetId:123
    }
・targetId 与自己对战的对手id 

### 取消对战(matchCancel) 
#### 参数
・无
#### 处理说明
・将自己相关的数据从battle_match表和battle_match_ready表中删除 
#### 返回值
    {
    } 

### 玩家对战结束(sendMultiResult) 
#### 参数
・targetId 对战玩家id
#### 处理说明
・将battle_match_ready表中相关数据删除。
・这里也是只有战斗胜利才会进行通信，玩家对战获胜后能得到金币，宝箱以及奖杯，获得的金币和奖杯根据对战玩家和自己的奖杯差来决定，这个后面再讨论，暂时随便设置一个固定值，比如金币30，奖杯20，这里还需要一个特殊处理，因为输的人不需要通信，所以赢的人通信的时候要把对手的奖杯数也一起扣掉，就是说自己的奖杯数增加，对手的奖杯数减少。 
#### 返回值
    {
        playerModel:playerModel,
        boxId:1,
        cup:20,
        coin:30
    }
・playerModel 玩家信息，和login时的返回结果相同 

・boxId 新获取的宝箱,新宝箱已经放到playerModel里了，这里的boxId是为了在战斗结果画面中显示。 如果没有获取新宝箱，则boxId为0。

・cup 获取的奖杯数。  

・coin 获取的金币数。  

### 排行榜(getLeaderboard) 
#### 参数

・rank 开始位置

・count 人数

#### 处理说明
・玩家对战获取的奖杯数排行榜 
#### 返回值
    {
        leaderboard:[
        {rank:1,userId:1,name:"lufy01",level:10,cup:3000},
        {rank:2,userId:2,name:"lufy02",level:9,cup:2999}
        ]
    }
・rank 排名 

・userId 玩家id。

・name 玩家昵称。

・level 玩家等级。

・cup 玩家的奖杯数。   

### 获取登录奖励(getLoginBonus) 
#### 参数
无
#### 处理说明
登录奖励每天领取一次，可以获得宝石，金币，卡牌或者宝箱 
登录奖励采用周期制，七天一个周期，比如七天的奖励分别是100金币,200金币，1张白卡，1张橙卡，1个初级宝箱，1张紫卡，1个中级宝箱，玩家每次登录依次获取，当获取到最后的中级宝箱之后，进入下一个周期继续领取，玩家不需要连续登录，第一天登录1次，隔三天再登录的时候，可以接着继续领取奖励，不需要重新从第一天算起。
登录奖励的设置需要新增一个master_loginbonus表来设置
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

・contents 登录奖励，如果是宝箱的话，宝箱会自动打开，玩家直接显示宝箱内的奖励，所以服务器判断，玩家得到宝箱的时候，直接打开宝箱。   

## 表
### master_chapters 
相当于一个大的章节目录

|name|说明|
|--|--|
|id|3位数字，从100开始依次递增|
|title|章节名|

### master_stages
每一个大的章节里所包含小的战斗stage

|name|说明|
|--|--|
|id|6位数字，前3位是章节id，后三位才是stage的id，比如100001,100002|
|title|战斗名称|
|map|地图id，地图我都按照id放到客户端，根据这个id来显示|
|gem|首次获胜奖励的宝石个数|

### master_stages_enemys

|name|说明|
|--|--|
|stage_id|master_stages的id|
|step_id|战斗中分为2-3个小阶段，所以需要有个区分|
|character_id|敌人id|
|level|敌人的等级|
|is_boss|是否是boss|

### master_user_level 
玩家升级经验列表,游戏发布第一版时玩家获得经验的途径只有卡牌升级，以后还会增加其他途径

|name|说明|
|--|--|
|level|玩家等级|
|exp|升到下一级所需经验|

### master_shop 
商品列表

|name|说明|
|--|--|
|id|商品id|
|name|商品名|
|icon|商品图标|
|price_gem|宝石价格|
|price_coin|金币价格|
|coin|可以获得的金币|
|box_id|可以获得的宝箱id|

### master_purchase 
氪金列表


|name|说明|
|--|--|
|id|商品id|
|icon|商品图标|
|price|价格|
|gem|宝石数量|

---------------------------------------
## 定时任务
### 对战对手搜寻配对
#### 相关表
battle_match表

|name|说明|
|--|--|
|player_id|玩家的id|
|cup|玩家的奖杯数|
|register_time|数据登录时间|

battle_match_ready表

|name|说明|
|--|--|
|player_id1|玩家1的id|
|player_id2|玩家2的id|
|register_time|数据登录时间|

#### 频率
每1秒钟执行1次，因为battle_match表中的数据配对完成后就会删除，数据量应该是很有限的，所以每秒执行1次应该不会对服务器造成压力。

#### 处理说明
1，玩家选择对战后，先调用matchStart将自己的id添加到battle_match表中，然后等待服务器为自己搜寻对手。服务器每1秒钟查询一次battle_match表，将所有数据按照奖杯数排序取出，自上而下或自下而上，按照奖杯数两两配对，配对条件为奖杯数相差200以内，两两配对成功的用户登录到battle_match_ready表，并从battle_match表中删除。

2，将过期数据从battle_match表和battle_match_ready表中删除

### 一个赛季结束后的奖品发放
#### 频率
每周一次
#### 处理说明
待添加
