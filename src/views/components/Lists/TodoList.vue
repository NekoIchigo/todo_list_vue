<template>
    <div>
        <ul role="list" class="divide-y divide-gray-100">
            <li v-for="item in list" @click="$emit('click', item)"
                class="flex justify-between gap-x-6 py-5 px-3 hover:cursor-pointer hover:bg-slate-100 rounded-md">
                <div class="min-w-0 flex-auto">
                    <p class="text-sm font-semibold leading-6 text-gray-900">
                        {{ item['description'] }}
                    </p>
                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">
                        {{ item['user']['username'] }}
                    </p>
                </div>
                <div class="shrink-0 sm:flex sm:flex-col sm:items-end">
                    <div class="mt-1 flex items-center gap-x-1.5">
                        <p class="text-xs leading-5 text-gray-500">{{ item['status'] }}</p>
                        <div :class="['flex-none rounded-full p-1', item['status'] == 'done' ? 'bg-emerald-500/20' : 'bg-orange-500/20']">
                            <div :class="['h-1.5 w-1.5 rounded-full', item['status'] == 'done' ? 'bg-emerald-500' : 'bg-orange-500']"></div>
                        </div>
                    </div>
                    <div @click.stop="$emit('delete', item)">
                        <p class="text-red-400 hover:text-red-600 text-sm">Delete</p>
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
