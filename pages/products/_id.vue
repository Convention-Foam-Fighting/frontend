<template>
  <section class="section">
    <div class="container">
      <div class="columns is-desktop is-vcentered">
        <div class="column is-6-desktop image-container">
          <img :src="image" :alt="title" class="main" />
          <div class="level is-mobile">
            <div class="level-item">
              <img
                src="https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2"
                alt=""
              />
            </div>
            <div class="level-item">
              <img
                src="https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2"
                alt=""
              />
            </div>
            <div class="level-item">
              <img
                src="https://bulma.dev/placeholder/pictures/bg_4-3.svg?primary=00d1b2"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="column is-6-desktop">
          <div class="level is-mobile">
            <div class="level-left">
              <a class="level-item" href="#">
                <font-awesome-layers class="fa-3x">
                  <font-awesome-icon :icon="['fas', 'sword']" />
                </font-awesome-layers>
              </a>
              <a class="level-item" href="#">
                <font-awesome-layers class="fa-3x">
                  <font-awesome-icon :icon="['fas', 'sword']" />
                </font-awesome-layers>
              </a>
              <a class="level-item" href="#">
                <font-awesome-layers class="fa-3x">
                  <font-awesome-icon :icon="['fas', 'sword']" />
                </font-awesome-layers>
              </a>
              <a class="level-item" href="#">
                <font-awesome-layers class="fa-3x">
                  <font-awesome-icon :icon="['fas', 'sword']" />
                </font-awesome-layers>
              </a>
              <a class="level-item" href="#">
                <font-awesome-layers class="fa-3x">
                  <font-awesome-icon :icon="['fas', 'sword']" />
                </font-awesome-layers>
              </a>
            </div>
          </div>
          <h2 class="title is-spaced">{{ title }}</h2>
          <p class="subtitle">{{ description }}</p>
          <div class="level is-mobile">
            <div class="level-left">
              <a class="level-item" href="#">
                <div class="tag is-primary">&nbsp;</div>
              </a>
              <a class="level-item" href="#">
                <div class="tag is-danger">&nbsp;</div>
              </a>
              <a class="level-item" href="#">
                <div class="tag is-dark">&nbsp;</div>
              </a>
              <a class="level-item" href="#">
                <div class="tag is-info">&nbsp;</div>
              </a>
            </div>
          </div>
          <div class="columns">
            <div class="column is-half">
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="label">$70</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <input class="input" type="number" placeholder="1" />
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                      <button class="button is-primary">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="level is-mobile">
            <div class="level-left">
              <div class="level-item"><a href="#">Add to favorites</a></div>
            </div>
            <div class="level-right">
              <div class="level-item">Share</div>
              <a class="level-item" href="#">
                <font-awesome-filter class="fa-2x">
                  <font-awesome-icon :icon="['fab', 'facebook']" />
                </font-awesome-filter>
              </a>
              <a class="level-item" href="#">
                <font-awesome-filter class="fa-2x">
                  <font-awesome-icon :icon="['fab', 'instagram']" />
                </font-awesome-filter>
              </a>
              <a class="level-item" href="#">
                <font-awesome-filter class="fa-2x">
                  <font-awesome-icon :icon="['fab', 'twitter']" />
                </font-awesome-filter>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: 'Long Sword',
      description: 'A long sword that is great for boffer fighting.',
      image: 'http://conventionfoamfighting.com/images/sword.jpg'
    }
  }
}
</script>

<style scoped>
.image-container {
  background: #1c1c1c;
}
.main {
  max-height: 400px;
  margin: 0 25%;
}
</style>
