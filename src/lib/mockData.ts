import { DataAsset, BusinessDomainMap } from './types';

export const mockAssets: DataAsset[] = [
  {
    id: 'A1001',
    name: '全国路网高精地图',
    catalog: '地图数据',
    assetLevel: 'S核心',
    securityLevel: 'L3-保密',
    owner: '地图数采团队',
    updateFrequency: '日更',
    description: '覆盖全国高速及各大主要城市主干道的厘米级高清矢量地图数据。',
    tags: {
      business: ['G1-城市安全', '路径规划', 'API接口'],
      data: ['矢量地图', '日更', '全国'],
      capability: ['时空计算', '查询服务', '内部专用']
    },
    healthScore: 98,
    dataVolume: '45.2 TB',
  },
  {
    id: 'A1002',
    name: '实时交通事件感知',
    catalog: '交通动态',
    assetLevel: 'A重要',
    securityLevel: 'L2-内部',
    owner: '车路协同部',
    updateFrequency: '实时',
    description: '通过V2X感知路端事件(拥堵、事故)并实时下发。',
    tags: {
      business: ['B1-物流', '风险预警', 'SaaS服务'],
      data: ['路况事件', '实时', '城市'],
      capability: ['时空计算', '数据回流', '可对外商用']
    },
    healthScore: 95,
    dataVolume: '1.2 亿条/日',
  },
  {
    id: 'B2001',
    name: '商用车轨迹合规校验',
    catalog: '物流运营',
    assetLevel: 'S核心',
    securityLevel: 'L3-保密',
    owner: '物流算法组',
    updateFrequency: '实时',
    description: '分析货车轨迹与订单路径的重合度，进行防串货校验。',
    tags: {
      business: ['B1-物流', '履约核验', 'API接口'],
      data: ['轨迹数据', '实时', '全国'],
      capability: ['时空计算', '查询服务', '需授权']
    },
    healthScore: 100,
    dataVolume: '300 TB',
  },
  {
    id: 'C3001',
    name: '驾驶员高风险行为模型',
    catalog: '视觉模型',
    assetLevel: 'S核心',
    securityLevel: 'L4-绝密',
    owner: '数据科学部',
    updateFrequency: '周更',
    description: '基于视觉感知与操作日志分析驾驶员疲劳、分心等高危行为。',
    tags: {
      business: ['G2-城市运营', '风险预警', '软硬一体'],
      data: ['影像数据', '周更', '全国'],
      capability: ['图像识别', '大模型', '脱敏可用']
    },
    healthScore: 92,
    dataVolume: '12 TB',
  },
  {
    id: 'D4001',
    name: '充换电站网点台账',
    catalog: '能源网络',
    assetLevel: 'B一般',
    securityLevel: 'L1-公开',
    owner: '能源业务部',
    updateFrequency: '日更',
    description: '全国合作充换电站的位置、状态、费率等基础信息。',
    tags: {
      business: ['B2-企服', '动态定价', '数据包'],
      data: ['能源站点', '日更', '全国'],
      capability: ['查询服务', '分析报表', '可对外商用']
    },
    healthScore: 99,
    dataVolume: '150 万条',
  },
  {
    id: 'E5001',
    name: '城市全量楼盘字典与网格数据',
    catalog: '地址数据',
    assetLevel: 'A重要',
    securityLevel: 'L2-内部',
    owner: '不动产数据中心',
    updateFrequency: '月更',
    description: '覆盖全国各级城市的楼盘字典、小区边界信息、楼栋网格及基础配套属性，为环卫、消杀、物业等场景提供收费底数。',
    tags: {
      business: ['G2-城市运营', '动态定价', '专业服务'],
      data: ['POI', '静态', '城市'],
      capability: ['查询服务', '可对外商用', '分析报表']
    },
    healthScore: 94,
    dataVolume: '8.4 亿条',
  },
  {
    id: 'T0001',
    name: 'AOI数据',
    catalog: '位置大数据',
    assetLevel: 'A重要',
    securityLevel: 'L3-保密',
    owner: 'B1物流地图',
    updateFrequency: '实时',
    description: '存储量 62441.54MB，总量 1.85亿条',
    tags: {
      business: ['B1-物流', '数据包', '精准营销', '物流规划', '选址'],
      data: ['11张表', '实时'],
      capability: ['内部专用']
    },
    healthScore: 92,
    dataVolume: '1.85亿条',
  },
  {
    id: 'T0002',
    name: 'Wi-Fi定位数据',
    catalog: '位置大数据',
    assetLevel: 'B一般',
    securityLevel: 'L3-保密',
    owner: 'B1物流地图',
    updateFrequency: '静态',
    description: '存储量 30.62TB，总量 2168.30亿条',
    tags: {
      business: ['B1-物流', '数据包'],
      data: ['3张表', '静态'],
      capability: ['内部专用']
    },
    healthScore: 88,
    dataVolume: '2168.30亿条',
  },
  {
    id: 'T0003',
    name: '公安空间数据',
    catalog: '政务与公安',
    assetLevel: 'S核心',
    securityLevel: 'L2-内部',
    owner: 'G1城市安全',
    updateFrequency: '静态',
    description: '覆盖11个城市，总量330万条',
    tags: {
      business: ['G1-城市安全', '警情研判', '调度分析'],
      data: ['111张表', '城市', '静态'],
      capability: ['需脱敏审批']
    },
    healthScore: 95,
    dataVolume: '330万条',
  },
  {
    id: 'T0004',
    name: '地址数据',
    catalog: '地址数据',
    assetLevel: 'S核心',
    securityLevel: 'L4-绝密',
    owner: 'B1物流地图',
    updateFrequency: '实时',
    description: '存储量810.00MB，总量6.99亿条',
    tags: {
      business: ['B1-物流', '末端配送', '路由规划', '履约核验'],
      data: ['6张表', '实时'],
      capability: ['涉敏禁出']
    },
    healthScore: 98,
    dataVolume: '6.99亿条',
  },
  {
    id: 'T0005',
    name: '地理编码数据',
    catalog: '地址数据',
    assetLevel: 'A重要',
    securityLevel: 'L4-绝密',
    owner: 'B1物流地图',
    updateFrequency: '实时',
    description: '存储量6.58TB，总量844.75亿条',
    tags: {
      business: ['B1-物流'],
      data: ['5张表', '实时'],
      capability: ['涉敏禁出']
    },
    healthScore: 97,
    dataVolume: '844.75亿条',
  },
  {
    id: 'T0006',
    name: '政务空间数据',
    catalog: '政务与公安',
    assetLevel: 'A重要',
    securityLevel: 'L2-内部',
    owner: 'G1城市安全',
    updateFrequency: '静态',
    description: '覆盖5个城市，总量178万条',
    tags: {
      business: ['G1-城市安全', '警情分析', '风险预警'],
      data: ['34张表', '静态', '城市'],
      capability: ['脱敏可用']
    },
    healthScore: 90,
    dataVolume: '178万条',
  },
  {
    id: 'T0007',
    name: '环卫空间数据',
    catalog: '城市空间',
    assetLevel: 'B一般',
    securityLevel: 'L4-绝密',
    owner: 'G2城市运营',
    updateFrequency: '实时',
    description: '存储量17468.08MB，总量2567万条',
    tags: {
      business: ['G2-城市运营'],
      data: ['53张表', '实时'],
      capability: ['内部专用']
    },
    healthScore: 85,
    dataVolume: '2567万条',
  },
  {
    id: 'T0008',
    name: '电子围栏数据',
    catalog: '位置大数据',
    assetLevel: 'S核心',
    securityLevel: 'L3-保密',
    owner: 'B1物流地图',
    updateFrequency: '实时',
    description: '存储量26603.52MB，总量2242万条',
    tags: {
      business: ['B1-物流'],
      data: ['4张表', '实时'],
      capability: ['内部专用']
    },
    healthScore: 96,
    dataVolume: '2242万条',
  },
  {
    id: 'T0009',
    name: '轨迹数据',
    catalog: '位置大数据',
    assetLevel: 'S核心',
    securityLevel: 'L3-保密',
    owner: 'B1物流地图',
    updateFrequency: '日更',
    description: '存储量68.76TB，总量7710.62亿条',
    tags: {
      business: ['B1-物流', '轨迹推演', '合规监管'],
      data: ['2张表', '日更'],
      capability: ['需脱敏审批']
    },
    healthScore: 99,
    dataVolume: '7710.62亿条',
  },
  {
    id: 'B0001',
    name: 'IoT感知',
    catalog: '城市运管',
    assetLevel: 'A重要',
    securityLevel: 'L4-绝密',
    owner: 'G2城市运营',
    updateFrequency: '实时',
    description: '存储量7.18TB，总量1478亿条',
    tags: {
      business: ['G2-城市运营'],
      data: ['30张表', '实时'],
      capability: ['涉敏禁出']
    },
    healthScore: 94,
    dataVolume: '1478亿条',
  },
  {
    id: 'B0002',
    name: '人车物档案',
    catalog: '行业本体',
    assetLevel: 'S核心',
    securityLevel: 'L4-绝密',
    owner: 'G2城市运营',
    updateFrequency: '实时',
    description: '存储量62650.34MB，总量8843万条',
    tags: {
      business: ['G2-城市运营'],
      data: ['30张表', '实时'],
      capability: ['涉敏禁出']
    },
    healthScore: 95,
    dataVolume: '8843万条',
  },
  {
    id: 'B0003',
    name: '作业调度',
    catalog: '物流运营',
    assetLevel: 'S核心',
    securityLevel: 'L3-保密',
    owner: 'G2城市运营',
    updateFrequency: '实时',
    description: '存储量47828.13MB，总量6014万条',
    tags: {
      business: ['G2-城市运营'],
      data: ['31张表', '实时'],
      capability: ['需脱敏审批']
    },
    healthScore: 91,
    dataVolume: '6014万条',
  },
  {
    id: 'B0004',
    name: '城市运管及建筑垃圾管理',
    catalog: '城市运管',
    assetLevel: 'A重要',
    securityLevel: 'L2-内部',
    owner: 'G2城市运营',
    updateFrequency: '实时',
    description: '包括人员管理、案件管理、GPS管理、围栏管理等各种专题表',
    tags: {
      business: ['G2-城市运营', '城管巡查', '应急调度'],
      data: ['多表汇总', '实时'],
      capability: ['脱敏可用']
    },
    healthScore: 89,
    dataVolume: '600万+条',
  },
  {
    id: 'B0005',
    name: '客户数据',
    catalog: '客户数据',
    assetLevel: 'S核心',
    securityLevel: 'L3-保密',
    owner: 'B1物流地图',
    updateFrequency: '周更',
    description: '存储量9789.44MB，总量2000万条',
    tags: {
      business: ['B1-物流', '用户画像', '广告推荐', '动态定价'],
      data: ['1张表', '周更'],
      capability: ['需脱敏审批']
    },
    healthScore: 97,
    dataVolume: '2000万条',
  },
  {
    id: 'B0006',
    name: '客户数据-语义数据',
    catalog: '语义知识',
    assetLevel: 'A重要',
    securityLevel: 'L2-内部',
    owner: 'G1城市安全',
    updateFrequency: '静态',
    description: '存储量26.86亿条，覆盖54个城市',
    tags: {
      business: ['G1-城市安全'],
      data: ['2105张表', '静态', '城市'],
      capability: ['脱敏可用']
    },
    healthScore: 93,
    dataVolume: '26.86亿条',
  },
  {
    id: 'B0007',
    name: '量化考核',
    catalog: '城市运管',
    assetLevel: 'B一般',
    securityLevel: 'L3-保密',
    owner: 'G2城市运营',
    updateFrequency: '实时',
    description: '存储量101025.79MB，总量2.00亿条',
    tags: {
      business: ['G2-城市运营'],
      data: ['91张表', '实时'],
      capability: ['内部专用']
    },
    healthScore: 86,
    dataVolume: '2.00亿条',
  }
];

export const mockBusinessDomains: BusinessDomainMap[] = [
  {
    id: 'DOM-AD',
    name: '智驾数据服务',
    description: '面向L2+ / L3智能重卡的高清数据采集、标注与合规服务',
    revenueStatus: '核心盈利',
    coreMetrics: [
      { label: '累计收入', value: '200万/年' },
      { label: '数据储备', value: '465TB' },
    ],
    assetsUsed: ['A1001', 'A1002']
  },
  {
    id: 'DOM-LOG',
    name: '物流履约核验',
    description: '基于轨迹大数据+时空算法的货运订单履约防伪核验',
    revenueStatus: '稳步增长',
    coreMetrics: [
      { label: '单价', value: '20元/单' },
      { label: '化解纠纷', value: '1.07亿' },
    ],
    assetsUsed: ['B2001', 'A1001']
  },
  {
    id: 'DOM-INS',
    name: '保险科技风控',
    description: '基于驾驶行为数据的动态核保与理赔风控服务',
    revenueStatus: '高增长潜力',
    coreMetrics: [
      { label: '建模样本', value: '9000+' },
      { label: 'API调用', value: '月均1.3万次' },
    ],
    assetsUsed: ['C3001', 'B2001']
  }
];

export const catalogTree: Record<string, string[]> = {
  '时空数据': ['地图数据', '地址数据', '位置大数据', '实景感知', '交通动态', '政务与公安', '城市空间'],
  '业务域数据': ['物流运营', '车辆资产', '客户数据', '行业本体', '能源网络', '城市运管', '语义知识'],
  'API服务': ['通用API', '物流API', '安全API', '城运API', '企服API', '智驾API'],
  '模型资产': ['时空模型', '视觉模型', '语言模型', '决策模型', '智能体资产']
};

export const mockTaxonomy = {
  business: [
    { category: '所属BG', tags: ['丰行', 'B1-物流', 'B2-企服', 'G1-城市安全', 'G2-城市运营', '通用'] },
    { category: '业务场景', tags: ['路径规划', '风险预警', '履约核验', '众包采集', '动态定价', '合规监管', '巡查调度', '警情分析', '末端配送', '多式联运'] },
    { category: '应用形态', tags: ['SaaS服务', 'API接口', '数据包', '软硬一体', '专业服务', '模型订阅', '智能体服务'] },
  ],
  data: [
    { category: '数据类型', tags: ['矢量地图', '轨迹数据', '影像数据', 'POI', '路况事件', '能源站点', '地址数据', '本体数据', '文本数据'] },
    { category: '更新频率', tags: ['实时', '小时级', '日更', '周更', '季度', '静态'] },
    { category: '覆盖范围', tags: ['全国', '省域', '城市', '高速路网', '末端网点', '室内', '跨境'] },
  ],
  capability: [
    { category: '资产等级', tags: ['S核心', 'A重要', 'B一般'] },
    { category: '技术能力', tags: ['时空计算', '图像识别', '大模型', '路径规划', '数据标注', '本体构建', '运筹优化', '数据治理'] },
    { category: '输出形式', tags: ['查询服务', '分析报表', '模型训练', '数据回流', 'API订阅', '数据授权', '软硬件一体化'] },
    { category: '合规属性', tags: ['脱敏可用', '需授权', '内部专用', '可对外商用', '需脱敏审批', '涉敏禁出'] },
  ]
};

export const mockScenarioTaxonomy = {
  bg: [
    { category: '组织架构', tags: ['丰行', 'B1-物流', 'B2-企服', 'G1-城市安全', 'G2-城市运营', '通用'] }
  ],
  category: [
    { category: '场景分类', tags: ['物流场景', '经营场景', '治理场景', '智能场景'] }
  ],
  goal: [
    { category: '业务目标', tags: ['增收入', '降成本', '控风险', '提效率', '保合规'] }
  ],
  capability: [
    { category: '核心能力', tags: ['地址', '地图', '轨迹', '影像', '图谱', 'AI'] }
  ],
  status: [
    { category: '场景状态', tags: ['已上线', '建设中', '规划中'] }
  ]
};
