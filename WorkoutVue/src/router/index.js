// Composables
import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login/Login.vue'
import Home from '../views/Home/Home.vue'
import NewUser from '../views/New/User/NewUser.vue'
import NewStudent from '../views/New/Student/NewStudent.vue'
import NewWork from '../views/New/Work/NewWork.vue'
import Exercises from '../views/Management/Exercises.vue'
import Students from '../views/Management/Students.vue'
import Workouts from '../views/Workouts/Workouts.vue'


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/new/user',
      name: 'Cadastro',
      component: NewUser
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/new/student',
      name: 'Novo aluno',
      component: NewStudent
    },
    {
      path: '/new/work/:alunoId',
      name: 'Novo treino',
      component: NewWork,
      props: true
    },
    {
      path: '/exercises',
      name: 'Exercicios',
      component: Exercises
    },
    {
      path: '/students',
      name: 'Alunos',
      component: Students
    },
    {
      path: '/workouts',
      name: 'Treinos',
      component: Workouts
    }
  ]
})

export default router
