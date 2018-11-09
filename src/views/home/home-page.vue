<template>
  <div class="app-container">
    <div>
      <div ref="chongqingCharts" style="width: 100%; height: 900px;"></div>
    </div>
  </div>
</template>

<script>
  import 'echarts/map/js/province/chongqing'
  import echarts from 'echarts'
  export default {
    name: 'home-page',
    data() {
      return {}
    },
    mounted() {
      const myChart = echarts.init(this.$refs.chongqingCharts)

      myChart.setOption({
        backgroundColor: '#272D3A',
        // 标题
        title: {
          text: '中国地图闪闪发光',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        // 地图上圆点的提示
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return params.name + ' : ' + params.value[2]
          }
        },
        // 图例按钮 点击可选择哪些不显示
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'bottom',
          data: ['地区热度', 'top5'],
          textStyle: {
            color: '#fff'
          }
        },
        // 地理坐标系组件
        geo: {
          map: 'chongqing',
          label: {
            // true会显示城市名
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            // 地图背景色
            normal: {
              areaColor: '#465471',
              borderColor: '#282F3C'
            },
            // 悬浮时
            emphasis: {
              areaColor: '#8796B4'
            }
          }
        },
        // 系列列表
        series: [
          {
            name: '重庆市地图',
            type: 'map',
            mapType: '重庆', // 自定义扩展图表类型
            itemStyle: {
              normal: { label: { show: true }},
              emphasis: { label: { show: true }}
            },
            data: [
              { name: '奉节县', value: randomData() },
              { name: '巫溪县', value: randomData() },
              { name: '开州区', value: randomData() },
              { name: '酉阳土家族苗族自治县', value: randomData() },
              { name: '彭水苗族土家族自治县', value: randomData() },
              { name: '云阳县', value: randomData() },
              { name: '万州区', value: randomData() },
              { name: '城口县', value: randomData() },
              { name: '江津区', value: randomData() },
              { name: '石柱土家族自治县', value: randomData() },
              { name: '巫山县', value: randomData() },
              { name: '涪陵区', value: randomData() },
              { name: '丰都县', value: randomData() },
              { name: '武隆区', value: randomData() },
              { name: '南川区', value: randomData() },
              { name: '秀山土家族苗族自治县', value: randomData() },
              { name: '黔江区', value: randomData() },
              { name: '合川区', value: randomData() },
              { name: '綦江区', value: randomData() },
              { name: '忠县', value: randomData() },
              { name: '梁平县', value: randomData() },
              { name: '巴南区', value: randomData() },
              { name: '潼南区', value: randomData() },
              { name: '永川区', value: randomData() },
              { name: '垫江县', value: randomData() },
              { name: '渝北区', value: randomData() },
              { name: '长寿区', value: randomData() },
              { name: '大足区', value: randomData() },
              { name: '铜梁区', value: randomData() },
              { name: '荣昌区', value: randomData() },
              { name: '璧山区', value: randomData() },
              { name: '北碚区', value: randomData() },
              { name: '万盛区', value: randomData() },
              { name: '九龙坡区', value: randomData() },
              { name: '沙坪坝区', value: randomData() },
              { name: '南岸区', value: randomData() },
              { name: '江北区', value: randomData() },
              { name: '大渡口区', value: randomData() },
              { name: '渝中区', value: randomData() }

            ]
            // 自定义名称映射

          }
        ]
      })
    }
  }

  function randomData() {
    return Math.round(Math.random() * 1000)
}
</script>

<style scoped>
  .map {
    width: 100%;
    height: 800px;
  }
</style>
