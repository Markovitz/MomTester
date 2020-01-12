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
              <b-button variant="primary"><router-link to="/register" tag="span">Rejestracja</router-link></b-button> &nbsp;
              <b-button variant="success"><router-link to="/login" tag="span">Logowanie</router-link></b-button>
          </ul>
      </div>
    </b-container>
  </div>
</template>