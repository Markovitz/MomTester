<template>
  <div id="app">
    <b-container>
      <div id="nav">
          <ul class="nav nav-pills">
              <li class="nav-item">
              <router-link tag="a" class="nav-link" active-class="active" to="/" exact>Messages</router-link>
              </li>
              <li class="nav-item">
              <router-link tag="a" class="nav-link" active-class="active" to="/problems">Problems</router-link>
              </li>
          </ul>
      </div>
    </b-container>
  </div>
</template>