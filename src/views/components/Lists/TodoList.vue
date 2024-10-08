<template>
    <div>
        <ul role="list" class="divide-y divide-gray-100">
            <li v-for="item in list"
                class="flex justify-between gap-x-6 py-5 px-3 hover:cursor-pointer hover:bg-slate-100 rounded-md">
                <div class="min-w-0 flex-auto">
                    <p class="text-sm font-semibold leading-6 text-gray-900">
                        Item Name
                    </p>
                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">User name</p>
                </div>
                <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <div class="mt-1 flex items-center gap-x-1.5">
                        <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div :class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                        </div>
                        <p class="text-xs leading-5 text-gray-500">Online</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps(['list']);
const emits = defineEmits(['click']);
</script>
