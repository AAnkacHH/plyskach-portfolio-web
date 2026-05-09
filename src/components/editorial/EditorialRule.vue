<template>
    <div :class="['spread-rule', positionClass]" aria-hidden="true">
        <span class="rule-line"></span>
        <span v-if="tagL" :class="['rule-tag', tagLClass]">{{ tagL }}</span>
        <span class="rule-line rule-line-flex"></span>
        <span v-if="tagR" :class="['rule-tag', tagRClass]">{{ tagR }}</span>
        <span class="rule-line"></span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    tagL?: string;
    tagR?: string;
    /** Visual variants for the left/right tags. */
    tagLVariant?: 'default' | 'orange' | 'mono';
    tagRVariant?: 'default' | 'orange' | 'mono';
    /** Where in the spread the rule sits — affects vertical padding. */
    position?: 'top' | 'bottom' | 'inline';
}

const props = withDefaults(defineProps<Props>(), {
    tagLVariant: 'default',
    tagRVariant: 'default',
    position: 'inline'
});

const positionClass = computed(() => {
    if (props.position === 'top') return 'spread-rule-top';
    if (props.position === 'bottom') return 'spread-rule-bottom';
    return '';
});

const variantClass = (v: 'default' | 'orange' | 'mono') => {
    if (v === 'orange') return 'rule-tag-r';
    if (v === 'mono') return 'rule-tag-mono';
    return '';
};

const tagLClass = computed(() => variantClass(props.tagLVariant));
const tagRClass = computed(() => variantClass(props.tagRVariant));
</script>
