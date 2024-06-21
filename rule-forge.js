var editing = false;

/** Make every element's text editable within the browser. */
window.onload = function () {
	hideUi();
	showUi();
	setupKeybindings();
	updateTableOfContents();
	updateInputs();
	edit(true);
}

/** Press Ctrl+E to toggle edit mode. */
function setupKeybindings() {
	console.log("Setting up keybindings...");
	// Press Ctrl+E to toggle edit mode.
	document.addEventListener('keydown', e => {
		if (e.ctrlKey && e.key === 'e') {
			toggleEdit();
		}
	});
}

/** Make input values update their value immediately. */
function updateInputs() {
	console.log("Updating input values...");
	document.querySelectorAll('input').forEach(element => {
		element.addEventListener('input', event => {
			event.target.setAttribute('value', event.target.value);
		});
	});
}

/** Save this page to a local file. */
function save(filename = window.location.pathname.split('/').pop()) {
	console.log("Saving...");
	// Pre-save logic.
	let wasEditing = editing;
	edit(false);
	hideUi();
	updateTableOfContents();
	// Remove stupid moz-extension script that always gets added.
	let scripts = document.head.getElementsByTagName('script');
	for (let i = 0; i < scripts.length; i++) {
		if (scripts[i].getAttribute('src').startsWith('moz-extension://')) {
			document.head.removeChild(scripts[i]);
		}
	}
	
	// Save logic.
	var htmlContent = new XMLSerializer().serializeToString(document); // Get file's contents as string.
	htmlContent = htmlContent.replace(' xmlns="http://www.w3.org/1999/xhtml"', ''); // Remove stupid xmlns attribute that always gets added.
	var blob = new Blob([htmlContent], {type: "text/html"});
	var a = document.createElement("a");
	a.href = URL.createObjectURL(blob);
	a.download = filename ?? 'index.html';
	a.hidden = true;
	document.body.appendChild(a);
	a.innerHTML = "You're not supposed to see this...";
	a.click();
	document.body.removeChild(a);

	// Post-save logic.
	showUi();
	updateTableOfContents();
	edit(wasEditing);
}

/** Set page elements to be editable or read-only. */
function edit(isEditing = true) {
	console.log("Changing edit mode...");

	updateTableOfContents();
	editing = isEditing;
	
	// Set contenteditable on all elements (except no-text elements).
	document.querySelectorAll('.page *').forEach(e => {
		if (e.nodeName === 'HR'
			|| e.nodeName === 'DIV'
			|| e.nodeName === 'ARTICLE'
			|| e.nodeName === 'SECTION'
			|| e.nodeName === 'INPUT'
			|| e.nodeName === 'TEXTAREA') {
			return;
		}
		if (e.classList.contains('table-of-contents')
			|| e.classList.contains('toc-item')) {
			return;
		}

		if (isEditing) {
			e.setAttribute('contenteditable', true)
		}
		else {
			e.removeAttribute('contenteditable')
		}
	});

	// Update edit button visual.
	let editButton = document.getElementById('edit-button');
	if (editing) {
		editButton.classList.add('active');
		// editButton.innerHTML = 'Preview';
	} else {
		editButton.classList.remove('active');
		// editButton.innerHTML = 'Edit';
	}
}

/** Toggle between edit and read-only mode. */
function toggleEdit() {
	edit(!editing);
}

/** Change page tab's title. */
function setTitle(title) {
	console.log("Changing title...");
	document.title = title;
}

/** Show the UI panel. */
function showUi() {
	console.log("Showing the UI...");
	if (!document.querySelector('#ui')) {
		let html = '';
		html += `<div id="ui">`;
		html += `<div>`;
		html += `<span id="logo">Rule Forge</span>`;
		html += `<button id="edit-button" onclick="toggleEdit()">Edit</button>`;
		html += `<button id="save-button" onclick="save()">Save</button>`;
		html += `<textarea id="title-editor" rows="1" placeholder="Document Title" onchange="setTitle(this.value)"></textarea>`;
		html += `</div>`;
		html += `</div>`;
		document.body.innerHTML = html + document.body.innerHTML;
	}
	document.getElementById('title-editor').value = document.title;
}

/** Hide the UI panel. */
function hideUi() {
	console.log("Hiding the UI...");
	document.querySelectorAll('#ui').forEach(e => e.remove());
}

/** Update the IDs of every header (for link anchoring). */
function updateHeaderIds() {
	console.log("Updating header IDs...");
	document.querySelectorAll('.page h1, .page h2, .page h3, .page h4, .page h5, .page h6').forEach(element => {
		element.setAttribute('id', element.textContent.replace(/ /g, '_'));
	});
}

/** Update the table of contents to reflect changes in headers. */
function updateTableOfContents() {
	console.log("Updating table of contents...");
    updateHeaderIds();
    let tableOfContents = document.querySelector('div#table-of-contents');
    if (!tableOfContents) return;

    // Clear all children from table of contents.
	while (tableOfContents.firstChild) {
	    tableOfContents.removeChild(tableOfContents.firstChild);
	}

    // Create the top-level list.
    let rootList = document.createElement('ol');
	rootList.classList.add('toc-item');
    tableOfContents.appendChild(rootList);

    // Get all the headings in the '.page' element.
    let headings = document.querySelectorAll('.page>h1, .page>h2, .page>h3, .page>h4');
	console.log(headings);

    // Initialize variables to keep track of the current nesting level.
    let currentList = rootList;
    let currentLevel = 1;

    // Iterate over each heading.
    headings.forEach(h => {
		if (h.classList.contains('inline') || h.classList.contains('title') || h.classList.contains('subtitle')) {
			return;
		}
		console.log(h);

        let level = parseInt(h.tagName.charAt(1));

        // Create the list item for the heading.
        let li = document.createElement('li');
        li.innerHTML = `<a href="#${h.id}">${h.textContent}</a>`;
		li.classList.add('toc-item');

        if (level > currentLevel) {
            // If the current level is greater than or equal to the previous level, create a new nested list.
            let nestedList = document.createElement('ol');
			nestedList.classList.add('toc-item');
            currentList.lastChild?.appendChild(nestedList);
            currentList = nestedList;
        } else if (level < currentLevel) {
            // If the current level is less than the previous level, go up the nesting levels.
            while (level < currentLevel) {
                currentList = currentList.parentElement.parentElement;
                currentLevel--;
            }
        }

        // Append the list item to the current nested list.
        currentList.appendChild(li);
        currentLevel = level;
    });
}