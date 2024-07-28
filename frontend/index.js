import { initializeApp } from "firebase/app"
import { getDatabase, ref, push, onValue, remove } from "firebase/database"

async function getFirebaseConfig() {
    try {
        const response = await fetch("http://localhost:3004/firebase-config")
        if (!response.ok) {
            throw new Error("Network response was not ok")
        }
        return response.json()
    } catch (error) {
        console.error("Failed to fetch Firebase config:", error)
    }
}

getFirebaseConfig().then((firebaseConfig) => {
    if (firebaseConfig) {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig)
        const database = getDatabase(app)
        const referenceInDB = ref(database, "leads")

        const inputEl = document.getElementById("input-el")
        const inputBtn = document.getElementById("input-btn")
        const ulEl = document.getElementById("ul-el")
        const deleteBtn = document.getElementById("delete-btn")

        function render(leads) {
            let listItems = ""
            for (let i = 0; i < leads.length; i++) {
                listItems += `
                    <li>
                        <a target='_blank' href='${leads[i]}'>
                            ${leads[i]}
                        </a>
                    </li>
                `
            }
            ulEl.innerHTML = listItems
        }

        onValue(referenceInDB, function (snapshot) {
            const snapshotDoesExist = snapshot.exists()
            if (snapshotDoesExist) {
                const snapshotValue = snapshot.val()
                const leads = Object.values(snapshotValue)
                render(leads)
            }
        })

        deleteBtn.addEventListener("dblclick", function () {
            remove(referenceInDB)
            ulEl.innerHTML = ""
        })

        inputBtn.addEventListener("click", function () {
            push(referenceInDB, inputEl.value)
            inputEl.value = ""
        })
    }
})
