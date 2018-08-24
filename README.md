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
        }
    }
・characters 玩家拥有的卡牌，从cards表中获取，id是卡牌的card_id，也就是master_characters的id，level是卡牌等级，amount是卡牌的数量 

・boxs 玩家拥有的宝箱，从boxs表中获取，boxId是宝箱id，time是距离宝箱打开剩余的时间，status是宝箱状态，lock表示没有打开，unlock表示可以打开，或者正在解锁中。

・teams 玩家设置的站位组，是双重数组，因为以后会支持玩家设置多个站位组 

・teamIndex 玩家当前的展位组的索引 

・coin 金币 

・gem 宝石 

・exp 经验 

・lv 玩家等级  

・versions 各个master数据的版本，用户从服务器上获取的master数据会连同它们的版本一起保存到本地，之后通过对比来更新数据，如果不需要更新数据，则不会再次进行通信从服务器上获取 

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
#### 返回值
    与login的返回值相同 

## 类(game)
### 单人战斗结束(sendSingleResult) 
#### 参数
・stageId master_stages表中的id，master_stages表的结构可以先参考login返回值中的chapters那部分里的stages
#### 处理说明
・单人战斗只有胜利的时候才进行通信，获胜后能得到宝箱，首次获胜会获取少量宝石，只能获取一次，获取的宝石数量固定，暂定为2宝石 
#### 返回值
待定 
### 玩家对战结束(sendMultiResult) 
#### 参数
・result 0/1，失败或胜利

・targetId 对战玩家id
#### 处理说明
・玩家对战获胜后能得到金币，宝箱以及奖杯，获得的金币和奖杯根据对战玩家和自己的奖杯差来决定，这个后面再讨论 
#### 返回值
待定 


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

