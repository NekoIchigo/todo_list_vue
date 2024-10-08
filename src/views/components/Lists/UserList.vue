<template>
    <div>
        <ul role="list" class="divide-y divide-gray-100">
            <li v-for="item in list" @click="$emit('click', item)"
                class="flex justify-between gap-x-6 py-5 px-3 hover:cursor-pointer hover:bg-slate-100 rounded-md">
                <div class="min-w-0 flex-auto">
                    <p class="text-sm font-semibold leading-6 text-gray-900">{{ item["user_detail"]["first_name"] + " "
                        +
                        item["user_detail"]["last_name"] }}</p>
                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ item["user_detail"]["email"] }}</p>
                </div>
                <div class="shrink-0 sm:flex sm:flex-col sm:items-end">
                    <div class="w-12">
                        <p class="text-sm leading-6 text-gray-900 capitalize">{{ item["user_type"] }}</p>
                    </div>
                    <div class="w-12">
                        <p class="text-red-400 hover:text-red-600">Delete</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps(['list']);
const emits = defineEmits(['click', 'delete']);
</script>
