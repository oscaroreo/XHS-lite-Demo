<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面不存在</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
}

h1 {
  font-size: 72px;
  color: var(--primary-color);
  margin: 0;
}

p {
  font-size: 18px;
  color: var(--text-color-secondary);
  margin: 10px 0 20px;
}

a {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 15px;
}

a:hover {
  text-decoration: underline;
}
</style>