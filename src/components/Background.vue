<script>
export default {
    name: 'Background',
}
</script>
<template>
    <main
      class="flex bg-gradient-to-t to-[#7ACFF3] from-[#259DD0] min-h-[calc(100vh-93px)] justify-between items-center"
    >
        <section class="flex flex-col items-center justify-center w-2/4 ml-28">
            <p class="font-extrabold text-4xl text-white">
                Digital Treats For Your Business
            </p>
            <span class="text-base font-normal text-white">
                Foster Relationships with your Employees and Customers
            </span>
            <img
              src="/assets/images/bg.png"
              class="mt-5 w-[586px] h-48"
            />
        </section>
        <slot></slot>
    </main>
</template>
