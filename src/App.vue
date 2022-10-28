<template>
  <v-app class="bg-surface-variant">
    <v-main>
      <v-container>
        <HelloWorld />

        <v-row class="justify-center">
          <v-col
            cols="4"
            v-for="column of data.columns"
            :key="column.name"
            class="d-flex"
          >
            <v-card class="pa-3 w-100" elevation="3">
              <p class="text-capitalize">
                {{ column.name }}
              </p>

              <draggable
                v-model="column.list"
                group="items"
                item-key="id"
                ghost-class="drag-ghost"
                :class="{ 'dragging-box': dragging }"
                @start="dragging = true"
                @end="dragging = false"
              >
                <template #item="{ element: item, index: listIndex }">
                  <v-col class="drag-item" style="position: relative">
                    <template v-if="item.editing">
                      <form
                        @submit.prevent="editItem($event, column, listIndex)"
                        class="d-flex flex-column align-end w-100"
                      >
                        <v-text-field
                          class="w-100"
                          label="Description"
                          density="compact"
                          :value="item.description"
                          variant="solo"
                          single-line
                          name="description"
                          autocomplete="off"
                        >
                        </v-text-field>
                        <v-col class="d-flex px-0 justify-space-between">
                          <v-btn
                            type="button"
                            class="text-black mr-3"
                            @click="item.editing = false"
                          >
                            Cancel</v-btn
                          >
                          <v-btn type="submit" class="text-black"> Save</v-btn>
                        </v-col>
                      </form>
                    </template>

                    <template v-else>
                      <div
                        class="drag-options px-3 py-2 justify-end group-hidden group-hover-flex"
                      >
                        <button
                          variant="plain"
                          density="compact"
                          max-width="20px"
                          @click="item.editing = true"
                        >
                          <IconTaskEdit class="" />
                        </button>
                        <button
                          variant="plain"
                          density="compact"
                          max-width="20px"
                          @click="deleteItem(column, listIndex)"
                        >
                          <IconTrashCan class="text-red" />
                        </button>
                      </div>
                      <v-btn
                        variant="plain"
                        density="compact"
                        max-width="30px"
                        class="px-3 py-0"
                        @click="
                          item.state = item.state === 'done' ? 'new' : 'done'
                        "
                      >
                        <IconCheckboxMarked v-if="item.state == 'done'" />
                        <IconCheckboxBlank v-if="item.state == 'new'" />
                      </v-btn>
                      <p
                        class="break-words"
                        :class="{
                          'text-decoration-line-through': item.state == 'done',
                        }"
                      >
                        {{ item.description }}
                      </p>
                    </template>
                  </v-col>
                </template>
              </draggable>
              <v-col class="pa-3 mt-5 elevation-1 bg-grey-lighten-1 text-right">
                <form @submit.prevent="addItem($event, column)">
                  <v-text-field
                    label="Description"
                    density="compact"
                    variant="solo"
                    single-line
                    name="description"
                    :autocomplete="false"
                  >
                  </v-text-field>
                  <v-btn type="submit" class=""> Add</v-btn>
                </form>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import uniqid from "uniqid";

import IconCheckboxBlank from "~icons/mdi/checkbox-blank-outline";
import IconCheckboxMarked from "~icons/mdi/checkbox-marked";
import IconTrashCan from "~icons/mdi/trash-can-outline";
import IconTaskEdit from "~icons/mdi/text-box-edit-outline";
import draggable from "vuedraggable";

import HelloWorld from "@/components/HelloWorld.vue";

// import HelloWorld from "./components/HelloWorld.vue";
interface Column {
  name: string;
  list: {
    id: string;
    description: string;
    state: "new" | "done";
    editing: boolean;
  }[];
}

function editItem(event: Event, column: Column, listIndex: number) {
  const form = event.target as HTMLFormElement;
  const formdata = new FormData(form);
  const description = formdata.get("description") as string;
  console.log(description);

  column.list[listIndex].description = description;
  column.list[listIndex].editing = false;
}
function deleteItem(column: Column, listIndex: number) {
  column.list.splice(listIndex, 1);
}

function addItem(event: Event, column: Column) {
  const form = event.target as HTMLFormElement;
  const formdata = new FormData(form);
  const description = formdata.get("description") as string;
  console.log(description);

  column.list.push({
    id: uniqid(),
    description,
    state: "new",
    editing: false,
  });

  form.reset();
}

const dragging = ref(false);

const defaultData = {
  columns: [
    {
      name: "now",
      list: [{ id: "1", description: "ad", state: "done" }],
    },
    {
      name: "next",
      list: [],
    },
    {
      name: "later",
      list: [],
    },
  ],
} as { columns: Column[] };

const localStorageData = localStorage.getItem("todo-app-data");

const data = localStorageData
  ? reactive(JSON.parse(localStorageData))
  : reactive(defaultData);

watch(data, (newData) => {
  localStorage.setItem("todo-app-data", JSON.stringify(newData));
});
</script>
