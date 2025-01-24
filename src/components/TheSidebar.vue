<script>
import logo from '@/assets/img/logo.webp'
import avatar from '@/assets/img/avatar.jpg'
import HomeIcon from '@/icons/HomeIcon.vue'
import ExitIcon from '@/icons/ExitIcon.vue'
import ListIcon from '@/icons/ListIcon.vue'
import PaperIcon from '@/icons/PaperIcon.vue'
import AnimalIcon from '@/icons/AnimalIcon.vue'
import UserIcon from '@/icons/UserIcon.vue'
import HeartIcon from '@/icons/HeartIcon.vue'
import ChartIcon from '@/icons/ChartIcon.vue'
import WrenchIcon from '@/icons/WrenchIcon.vue'

export default {
  name: 'TheSidebar',
  components: {
    HomeIcon,
    ExitIcon,
    ListIcon,
    PaperIcon,
    AnimalIcon,
    UserIcon,
    HeartIcon,
    ChartIcon,
    WrenchIcon
  },
  data() {
    return {
      logo,
      avatar,
      menu: [
        { label: 'Главная', link: '/', icon: 'HomeIcon' },
        { label: 'Заявки', link: '/orders', icon: 'ListIcon' },
        {
          label: 'Ветеринарные услуги',
          link: '/vet-services',
          icon: 'PaperIcon'
        },
        { label: 'Питомцы', link: '/pets', icon: 'AnimalIcon' },
        { label: 'Пользователи', link: '/users', icon: 'UserIcon' },
        { label: 'Отзывы', link: '/reviews', icon: 'HeartIcon' },
        { label: 'Статистика', link: '/statistics', icon: 'ChartIcon' },
        { label: 'Настройки', link: '/settings', icon: 'WrenchIcon' }
      ]
    }
  },
  methods: {
    logout() {
      this.$router.push('/login')
    }
  },
  emits: ['changePage']
}
</script>

<template>
  <aside class="sidebar" aria-label="Sidebar">
    <div class="sidebar__wrapper">
      <RouterLink to="/" aria-label="Главная" class="sidebar__logo">
        <img :src="logo" alt="Vet2Pet" />
      </RouterLink>
      <nav class="menu">
        <ul class="menu__list">
          <li class="menu__item" v-for="(item, idx) in menu" :key="idx">
            <RouterLink
              :to="item.link"
              class="menu__link"
              @click="$emit('changePage')"
            >
              <span class="icon-wrapper">
                <component :is="item.icon" />
              </span>
              <span>{{ item.label }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
      <div class="profile">
        <div class="profile__avatar">
          <img
            :src="avatar"
            alt="Константинопольский Константин Константинович"
          />
        </div>
        <div class="profile__fio">
          Константинопольский <br />
          Константин Константинович
        </div>
        <div class="profile__role">Администратор Vet2pet</div>
      </div>
      <div class="exit">
        <button type="button" class="exit__button" @click="logout">
          <ExitIcon />
          <span> Выйти </span>
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 280px;
  height: 100dvh;
  transition: all 0.3s ease;
  color: var(--secondary);
  font-weight: 500;
}

.sidebar__wrapper {
  background: var(--surface-bright);
  height: 100%;
  padding: 32px 23px 40px 17px;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar__wrapper::-webkit-scrollbar {
  width: 5px;
}

.sidebar__wrapper::-webkit-scrollbar-track {
  background: #d5f2ef;
}

.sidebar__wrapper::-webkit-scrollbar-thumb {
  background: #abe4de;
  border-radius: 4px;
}

.sidebar__logo {
  display: block;
  margin-bottom: 43px;
}

.sidebar__logo img {
  max-height: 77px;
  max-width: 100%;
}

.menu {
  height: 504px;
  overflow: hidden;
  margin-bottom: 84px;
}

.menu__list {
  overflow-y: auto;
  height: 100%;
}

.menu__item:not(:last-child) {
  margin-bottom: 8px;
}

.menu__link {
  display: flex;
  align-items: center;
  padding: 8px;
  font-size: 14px;
  width: 100%;
  line-height: 1;
  gap: 8px;
  transition: all 0.3s ease;
  -webkit-border-radius: var(--secondary-rounded);
  -moz-border-radius: var(--secondary-rounded);
  border-radius: var(--secondary-rounded);
  color: var(--secondary);
}

:deep(.menu__link svg *) {
  stroke: var(--secondary);
  transition: all 0.3s ease;
}

.icon-wrapper {
  width: 40px;
  flex-shrink: 0;
  height: 40px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  background: var(--on-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

:deep(.icon-wrapper svg) {
  max-width: 100%;
  height: auto;
  transition: all 0.3s ease;
}

.menu__link.router-link-active,
.menu__link:hover {
  color: var(--primary);
  font-weight: 700;
}

.menu__link.router-link-active {
  background: var(--on-primary);
}

.menu__link:hover .icon-wrapper,
.menu__link.router-link-active .icon-wrapper {
  box-shadow: var(--elevation_1_shadow);
}

:deep(.menu__link:hover svg *) {
  stroke: var(--primary);
}

.profile {
  padding: 0 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 40px;
}

.profile__role {
  font-size: 14px;
}

.profile__fio {
  margin-bottom: 8px;
  word-wrap: break-word;
  word-break: break-all;
}

.profile__avatar {
  width: 64px;
  height: 64px;
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 24px;
}

.profile__avatar img {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: top;
}

.exit {
  display: flex;
  justify-content: center;
}

.exit__button {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  gap: 16px;
  transition: all 0.3s ease;
}

.exit__button:hover {
  text-decoration: underline;
}

@media (max-width: 991.98px) {
  .sidebar__logo {
    display: none;
  }
  .menu {
    margin-bottom: 40px;
  }
}

@media (max-width: 390px) {
  .sidebar {
    position: fixed;
    width: 230px;
  }
  .sidebar__wrapper {
    padding: 30px 15px;
  }
}
</style>
