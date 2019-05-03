export const TEST_1_CONTENT = `
    <svelte:head>
        <title>It's just a test</title>
    </svelte:head>
	<div class="test-container">Well</div>
	<div class="test-footer" id="an-id"></div>
	<a href="#" id="a-link" class="a-link"></a>
	<input id="blo" type="text" disabled/>
`

export const TEST_1_TAG = ["html", "head", "title", "body", "div", "a", "input"]

export const TEST_1_CLASS = ["test-container", "test-footer", "a-link"]

export const TEST_1_ID = ["a-link", "blo"]

export const TEST_2_CONTENT = `

<script>
	let active = false;
</script>

<style>
    .test-container {
        color: darkgray;
        text-align: center;
    }

    .test-footer {
        font-weight: bold;
	}
	
	.abc {

	} 
</style>

<div id="app">
	<div class="test-container">Well</div>
	<div class="test-footer" id="an-id"></div>
	<a href="#" id="a-link" class="a-link" class:active class:is_active="{active == true}"></a>
	<input id="blo" type="text" disabled/>
</div>
`

export const TEST_2_TAG = ["div", "a", "input"]

export const TEST_2_CLASS = ["test-container", "test-footer", "a-link", "active", "is_active"]

export const TEST_2_ID = ["a-link", "blo"]
