<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
            <p class="text-indigo-600 text-3xl my-5 text-center">
                To Do List
            </p>
            <div v-if="!isLoading" class="flex justify-between ">
                <DefaultButton class="w-28 mb-5" label="Add To Do" @click="selectTodo(null)" />
                <div class="flex gap-5 h-10">
                    <ChevronLeft v-if="page > 1" class="text-indigo-600 rounded-md p-2 hover:cursor-pointer"
                        @click="prevPage" />
                    <ChevronRight v-if="page < lastPage" class="text-indigo-600 rounded-md p-2 hover:cursor-pointer"
                        @click="nextPage" />
                </div>
            </div>
            <div v-if="isLoading" class="mt-10 flex gap-2 items-center justify-center animate-pulse">
                <ArrowPath class="animate-spin text-indigo-600" />
                <p class="text-indigo-600">Loading ...</p>
            </div>
            <ToDoModal v-if="isModalOpen" @close="close" :item="selectedTodo" />
            <TodoList v-if="!isLoading" :list="todos" @click="selectTodo" @delete="showDeleteConfirmation" />
            <DeleteModal v-if="isDeleteShow" @close="isDeleteShow = false"
                :message="`Delete this user : ${selectedTodo['description']} ?`" @confirm="deleteTodo()" />
        </div>
    </div>
</template>

<script setup>
import DefaultButton from '@/views/components/Buttons/DefaultButton.vue';
import ChevronLeft from '@/views/components/Icons/ChevronLeft.vue';
import ChevronRight from '@/views/components/Icons/ChevronRight.vue';
import ArrowPath from '@/views/components/Icons/ArrowPath.vue';
import axios from '@/lib/axios';
import { inject, onMounted, ref } from 'vue';
import TodoList from '@/views/components/Lists/TodoList.vue';
import ToDoModal from '@/views/components/Modal/ToDoModal.vue';
import DeleteModal from '@/views/components/Modal/DeleteModal.vue';

const isLoading = ref(false);
const userId = inject("userId");
const todos = ref([]);
const page = ref(1);
const lastPage = ref(1);
const selectedTodo = ref(null);
const isModalOpen = ref(false);
const isDeleteShow = ref(false);
const message = inject("message");

const fetchTodoList = () => {
    isLoading.value = true;
    axios.get("/api/todos?user_id=" + userId.value).then(response => {
        lastPage.value = response.data.data["last_page"];
        todos.value = response.data.data.data;
    }).catch(error => {
        console.error(error?.response?.data?.message);
    }).finally(() => {
        isLoading.value = false;
    });
}

const deleteTodo = () => {
    isLoading.value = true;
    isDeleteShow.value = false
    axios.delete("/api/todos/" + selectedTodo.value.id).then(response => {
        message.value = response.data.message;
        fetchTodoList();
    }).catch(error => {
        console.error(error?.response?.data?.message);
    }).finally(() => {
        isLoading.value = false;
    });
}

const selectTodo = (event) => {
    isModalOpen.value = true;
    selectedTodo.value = event;
}

const nextPage = () => {
    if (page.value < lastPage.value) {
        page.value++;
        fetchTodoList();
    }
}

const prevPage = () => {
    if (page.value > 1) {
        page.value--;
        fetchTodoList();
    }
}

const close = () => {
    isModalOpen.value = false;
    fetchTodoList();
}

const showDeleteConfirmation = (event) => {
    console.log(event)
    selectedTodo.value = event;
    isDeleteShow.value = true;
}
onMounted(() => {
    fetchTodoList()
});
</script>
