<template>
    <div>
        <HeaderWeb />
        <div class="container mt-5 mb-5">
            <div class="card mx-auto shadow" style="max-width: 500px;">
                <div class="card-body">
                <h2 class="card-title text-center mb-4">Đăng ký</h2>
                <form @submit.prevent="handleAddUser">
                    <div class="mb-3">
                    <label class="form-label">Họ tên</label>
                    <input v-model="newUser.name" type="text" class="form-control" required />
                    </div>

                    <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input v-model="newUser.email" type="email" class="form-control" required />
                    </div>

                    <div class="mb-3">
                    <label class="form-label">Mật khẩu</label>
                    <input v-model="newUser.password" type="password" class="form-control" required />
                    </div>

                    <div class="mb-3">
                    <label class="form-label">Vai trò</label>
                    <select v-model="newUser.role">
                        <option value="Sinh viên">Sinh viên</option>
                        <option value="Giảng viên">Giảng viên</option>
                    </select>
                    </div>

                    <button type="submit" class="btn btn-primary w-100">Đăng ký</button>
                    
                    <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
                    {{ successMessage }}
                    </div>
                </form>
                </div>
            </div>
        </div>
        <FooterWeb />
    </div>
</template>
  

<script setup>
    import HeaderWeb from '@/components/HeaderWeb.vue';
    import FooterWeb from '@/components/FooterWeb.vue';
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import supabase from '../supabase'

    const router = useRouter()
    
    const Users=ref([]);
    const successMessage = ref('')
    
    const newUser = ref({
        email: '',
        password: '',
        name: '',
        role: ''
        })

    const fetchUser = async () => {
        const { data, error } = await supabase.from('User').select('*')
        if (error) {
            console.error(error)
        } else {
            Users.value = data
        }
    }

    const handleAddUser = async () => {
        const { data, error } = await supabase.from('User').insert([newUser.value])
        if (error) {
            console.error(error)
        } else {
            newUser.value = {  
                email: '',
                password: '',
                name: '',
                role: ''
            }
            successMessage.value = 'Đăng ký thành công!'
            fetchUser();
        }
    }

    onMounted(() => {
        fetchUser()
    })

</script>

