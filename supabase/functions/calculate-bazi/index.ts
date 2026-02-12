import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// 直接从 esm.sh 导入专业库，解决 Docker 找不到模块的问题
import { SolarTime } from "https://esm.sh/tyme4ts@1.2.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // 处理跨域
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('--- WITHIN BAZI START ---')
    
    // 我们改用更专业的 ISO 时间输入
    const { solarDatetime, gender } = await req.json()
    console.log('Received:', { solarDatetime, gender })

    // 1. 转换时间 (支持 ISO 格式)
    const date = new Date(solarDatetime);
    const solarTime = SolarTime.fromYmdHms(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      0
    );

    const lunarHour = solarTime.getLunarHour();
    const eightChar = lunarHour.getEightChar();
    
    // 2. 核心排盘逻辑
    const result = {
      "性别": gender === 0 ? "女" : "男",
      "阳历": solarTime.toString(),
      "农历": lunarHour.toString(),
      "八字": eightChar.toString(),
      "五行": {
        "年": eightChar.getYear().getHeavenStem().getElement().toString(),
        "月": eightChar.getMonth().getHeavenStem().getElement().toString(),
        "日": eightChar.getDay().getHeavenStem().getElement().toString(),
        "时": eightChar.getHour().getHeavenStem().getElement().toString(),
      },
      "日主": eightChar.getDay().getHeavenStem().toString(),
      "纳音": {
        "年": eightChar.getYear().getSound().toString(),
        "日": eightChar.getDay().getSound().toString(),
      },
      "消息": "Within 核心算法测算成功"
    };

    console.log('Calculation complete!')

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error('ERROR:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    })
  }
})