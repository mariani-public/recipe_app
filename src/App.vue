<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.header {
  background-color: rgb(16, 14, 23);
  color: lightseagreen;
  width: 100%;
  font-family: "Baloo Tamma 2", cursive;
  text-align: center;

  position: fixed;
  top: 0;
  left: 0;
}

.page-header {
  display: flex;
  align-items: center;

  font-size: 30px;
  font-weight: 500;
}
.go-back {
  margin-left: 10px;

  &:hover {
    cursor: pointer;
  }
}
</style>
