<template>
  <div>
    <el-container style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; overflow: hidden;">
      <!-- 头部 -->
      <el-header class="d-flex align-items-center">
        <!-- logo -->
        <a href="javascript:;" class="h5 text-light mr-auto mb-0" style="text-decoration:none;">{{$config.logo}}</a>
        <!-- 头部导航 -->
        <el-menu
          @select="handleSelect"
          :default-active="navBar.active"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item v-for="(item, index) in navBar.list" :key="index" :index="index | numToString">{{item.name}}
          </el-menu-item>
          <el-submenu index="10">
            <template slot="title">
              <el-avatar size="small"
                         src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              ADMIN
            </template>
            <el-menu-item index="10-1">修改</el-menu-item>
            <el-menu-item index="10-2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container style="height: 100%;">
        <!-- 侧边导航 -->
        <el-aside width="200px">
          <el-menu
            @select="slideSelect"
            :default-active="slideMenuActive"
            background-color="#D3DCE6"
            class="el-menu-vertical-demo"
            :unique-opened="true">
            <el-menu-item v-for="(item, index) in slideMenus" :key="index" :index="index | numToString">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 面包屑导航 -->
          <el-breadcrumb v-if="bran.length > 0" class="border-bottom mb-4" style="padding: 20px; margin: -20px;"
                         separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item, index) in bran" :key="index" :to="{ path: item.path }">{{item.title}}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 主内容 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import common from "@/common/mixins/common"

  export default {
    mixins: [common],
    data() {
      return {
        navBar: [],
        bran: []
      }
    },
    created() {
      this.navBar = this.$config.navBar
      this.getRouterBran()
      this.initNavBar()
    },
    watch: {
      '$route'() {
        localStorage.setItem('navActive', JSON.stringify({
          top: this.navBar.active || '0',
          left: this.slideMenuActive || '0'
        }))
        this.getRouterBran()
      }
    },
    computed: {
      slideMenuActive: {
        // return this.navBar.list[this.navBar.active].subActive || '0'
        get() {
          return this.navBar.list[this.navBar.active].subActive || '0'
        },
        set(value) {
          this.navBar.list[this.navBar.active].subActive = value
        }
      },
      slideMenus() {
        return this.navBar.list[this.navBar.active].subMenu || []
      }
    },
    methods: {
      handleSelect(key) {
        this.navBar.active = key
        this.slideMenuActive = '0'
        if (this.slideMenus.length > 0) {
          this.$router.push({
            name: this.slideMenus[this.slideMenuActive].pathname
          })
        }
      },
      slideSelect(key) {
        this.slideMenuActive = key
        this.$router.push({
          name: this.slideMenus[key].pathname
        })
      },
      getRouterBran() {
        let bran = this.$route.matched.filter(value => value.name)
        let arr = []
        bran.forEach((value) => {
          if (value.name === 'index' || value.name === 'layout') return
          arr.push({
            name: value.name,
            path: value.path,
            title: value.meta.title
          })
        })
        if (arr.length > 0) {
          arr.unshift({
            name: 'index',
            path: '/index',
            title: '首页'
          })
        }
        this.bran = arr
      },
      initNavBar() {
        let r = localStorage.getItem('navActive')
        if (r) {
          r = JSON.parse(r)
          this.navBar.active = r.top
          this.slideMenuActive = r.left
        }
      }
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #545c64;
    color: #333;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
</style>
