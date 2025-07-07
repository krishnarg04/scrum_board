class ScrumBoard {
    constructor() {
        this.categories = this.loadCategories();
        this.tasks = this.loadTasks();
        this.taskIdCounters = this.loadTaskIdCounters();
        this.currentTaskId = null;
        this.blockMode = this.loadBlockMode();
        this.darkMode = this.loadDarkMode();
        
        this.initializeEventListeners();
        this.loadDefaultCategories();
        this.renderCategories();
        this.renderTasks();
        this.setupDragAndDrop();
        this.updateBlockMode();
        this.updateDarkMode();
    }

    loadCategories() {
        const stored = localStorage.getItem('scrumCategories');
        return stored ? JSON.parse(stored) : {};
    }

    saveCategories() {
        localStorage.setItem('scrumCategories', JSON.stringify(this.categories));
    }

    loadTasks() {
        const stored = localStorage.getItem('scrumTasks');
        return stored ? JSON.parse(stored) : [];
    }

    saveTasks() {
        localStorage.setItem('scrumTasks', JSON.stringify(this.tasks));
    }

    loadTaskIdCounters() {
        const stored = localStorage.getItem('scrumTaskIdCounters');
        return stored ? JSON.parse(stored) : {};
    }

    saveTaskIdCounters() {
        localStorage.setItem('scrumTaskIdCounters', JSON.stringify(this.taskIdCounters));
    }

    loadBlockMode() {
        const stored = localStorage.getItem('scrumBlockMode');
        return stored ? JSON.parse(stored) : false;
    }

    saveBlockMode() {
        localStorage.setItem('scrumBlockMode', JSON.stringify(this.blockMode));
    }

    loadDarkMode() {
        const stored = localStorage.getItem('scrumDarkMode');
        return stored ? JSON.parse(stored) : false;
    }

    saveDarkMode() {
        localStorage.setItem('scrumDarkMode', JSON.stringify(this.darkMode));
    }

    loadDefaultCategories() {
        if (Object.keys(this.categories).length === 0) {
            const defaultColor = this.darkMode ? '#ffffff' : '#1a1a1a';
            this.categories = {
                'FEATURE': { name: 'Feature', color: defaultColor },
                'BUG': { name: 'Bug Fix', color: defaultColor },
                'TASK': { name: 'Task', color: defaultColor },
                'IMPROVEMENT': { name: 'Improvement', color: defaultColor }
            };
            this.saveCategories();
        }
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        this.saveDarkMode();
        this.updateDarkMode();
    }

    updateDarkMode() {
        const toggleBtn = document.getElementById('darkModeToggle');
        
        if (this.darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleBtn.classList.add('active');
        } else {
            document.documentElement.removeAttribute('data-theme');
            toggleBtn.classList.remove('active');
        }
    }

    toggleBlockMode() {
        this.blockMode = !this.blockMode;
        this.saveBlockMode();
        this.updateBlockMode();
    }

    updateBlockMode() {
        const board = document.getElementById('scrumBoard');
        const toggleBtn = document.getElementById('blockModeToggle');
        
        if (this.blockMode) {
            board.classList.add('block-mode');
            toggleBtn.classList.add('active');
        } else {
            board.classList.remove('block-mode');
            toggleBtn.classList.remove('active');
        }
    }

    addCategory(name, color) {
        const key = name.toUpperCase().replace(/\s+/g, '_');
        if (this.categories[key]) {
            alert('Category already exists!');
            return false;
        }
        
        this.categories[key] = { name, color };
        this.taskIdCounters[key] = this.taskIdCounters[key] || 0;
        this.saveCategories();
        this.saveTaskIdCounters();
        this.renderCategories();
        return true;
    }

    deleteCategory(categoryKey) {
        const tasksInCategory = this.tasks.filter(task => task.category === categoryKey);
        if (tasksInCategory.length > 0) {
            if (!confirm(`This category has ${tasksInCategory.length} tasks. Delete anyway?`)) {
                return false;
            }
            this.tasks = this.tasks.filter(task => task.category !== categoryKey);
            this.saveTasks();
        }
        
        delete this.categories[categoryKey];
        delete this.taskIdCounters[categoryKey];
        this.saveCategories();
        this.saveTaskIdCounters();
        this.renderCategories();
        this.renderTasks();
        return true;
    }

    generateTaskId(categoryKey) {
        this.taskIdCounters[categoryKey] = (this.taskIdCounters[categoryKey] || 0) + 1;
        this.saveTaskIdCounters();
        return `${categoryKey}-${this.taskIdCounters[categoryKey].toString().padStart(3, '0')}`;
    }

    addTask(categoryKey, description) {
        if (!categoryKey || !description.trim()) {
            alert('Please select a category and enter a description!');
            return false;
        }

        const task = {
            id: this.generateTaskId(categoryKey),
            category: categoryKey,
            description: description.trim(),
            stage: 'todo',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
        
        setTimeout(() => {
            const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
            if (taskElement) {
                taskElement.classList.add('new-task');
            }
        }, 100);
        
        return true;
    }

    updateTask(taskId, updates) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = {
                ...this.tasks[taskIndex],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            this.saveTasks();
            this.renderTasks();
            return true;
        }
        return false;
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
        this.renderTasks();
    }

    moveTask(taskId, newStage) {
        return this.updateTask(taskId, { stage: newStage });
    }

    renderCategories() {
        const categorySelect = document.getElementById('categorySelect');
        const categoriesList = document.getElementById('categoriesList');
        
        categorySelect.innerHTML = '<option value="">Select Category</option>';
        Object.entries(this.categories).forEach(([key, category]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });

        if (categoriesList) {
            categoriesList.innerHTML = '';
            Object.entries(this.categories).forEach(([key, category]) => {
                const categoryItem = document.createElement('div');
                categoryItem.className = 'category-item';
                categoryItem.innerHTML = `
                    <div>
                        <span class="category-color" style="background-color: ${category.color}"></span>
                        <span>${category.name} (${key})</span>
                    </div>
                    <button class="btn btn-danger" onclick="scrumBoard.deleteCategory('${key}')">Delete</button>
                `;
                categoriesList.appendChild(categoryItem);
            });
        }
    }

    renderTasks() {
        const stages = ['todo', 'progress', 'testing', 'completed'];
        
        stages.forEach(stage => {
            const stageList = document.getElementById(`${stage}List`);
            stageList.innerHTML = '';
            
            const stageTasks = this.tasks.filter(task => task.stage === stage);
            stageTasks.forEach(task => {
                const taskElement = this.createTaskElement(task);
                stageList.appendChild(taskElement);
            });
        });
    }

    createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';
        taskDiv.draggable = true;
        taskDiv.dataset.taskId = task.id;
        
        const category = this.categories[task.category];
        const categoryColor = category ? category.color : (this.darkMode ? '#ffffff' : '#1a1a1a');
        
        taskDiv.style.borderLeftColor = categoryColor;
        
        taskDiv.innerHTML = `
            <div class="task-header">
                <span class="task-id">${task.id}</span>
                <span class="task-category" style="background-color: ${categoryColor}; color: ${this.darkMode ? '#1a1a1a' : '#ffffff'};">
                    ${category ? category.name : task.category}
                </span>
            </div>
            <div class="task-description">${task.description}</div>
            <div class="task-meta">
                Created: ${new Date(task.createdAt).toLocaleDateString()}
            </div>
        `;

        taskDiv.addEventListener('click', () => this.openTaskModal(task.id));
        
        return taskDiv;
    }

    initializeEventListeners() {
        document.getElementById('darkModeToggle').addEventListener('click', () => {
            this.toggleDarkMode();
        });

        document.getElementById('blockModeToggle').addEventListener('click', () => {
            this.toggleBlockMode();
        });

        document.getElementById('addTaskBtn').addEventListener('click', () => {
            const categoryKey = document.getElementById('categorySelect').value;
            const description = document.getElementById('taskInput').value;
            
            if (this.addTask(categoryKey, description)) {
                document.getElementById('taskInput').value = '';
                document.getElementById('categorySelect').value = '';
            }
        });

        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('addTaskBtn').click();
            }
        });

        document.getElementById('addCategoryBtn').addEventListener('click', () => {
            this.openCategoryModal();
        });

        document.getElementById('manageCategoriesBtn').addEventListener('click', () => {
            this.openManageCategoriesModal();
        });

        document.getElementById('saveCategoryBtn').addEventListener('click', () => {
            this.saveCategoryFromModal();
        });

        document.getElementById('cancelCategoryBtn').addEventListener('click', () => {
            this.closeCategoryModal();
        });

        document.getElementById('saveTaskBtn').addEventListener('click', () => {
            this.saveTaskFromModal();
        });

        document.getElementById('deleteTaskBtn').addEventListener('click', () => {
            this.deleteTaskFromModal();
        });

        document.getElementById('closeTaskBtn').addEventListener('click', () => {
            this.closeTaskModal();
        });

        document.getElementById('closeManageCategoriesBtn').addEventListener('click', () => {
            this.closeManageCategoriesModal();
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('close')) {
                    modal.style.display = 'none';
                }
            });
        });
    }

    openCategoryModal() {
        document.getElementById('categoryModal').style.display = 'block';
        document.getElementById('categoryNameInput').value = '';
        document.getElementById('categoryColorInput').value = this.darkMode ? '#ffffff' : '#1a1a1a';
    }

    closeCategoryModal() {
        document.getElementById('categoryModal').style.display = 'none';
    }

    saveCategoryFromModal() {
        const name = document.getElementById('categoryNameInput').value.trim();
        const color = document.getElementById('categoryColorInput').value;
        
        if (name && this.addCategory(name, color)) {
            this.closeCategoryModal();
        }
    }

    openManageCategoriesModal() {
        this.renderCategories();
        document.getElementById('manageCategoriesModal').style.display = 'block';
    }

    closeManageCategoriesModal() {
        document.getElementById('manageCategoriesModal').style.display = 'none';
    }

    openTaskModal(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        this.currentTaskId = taskId;
        const category = this.categories[task.category];
        
        document.getElementById('taskId').textContent = task.id;
        document.getElementById('taskCategory').textContent = category ? category.name : task.category;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskStage').textContent = this.getStageDisplayName(task.stage);
        document.getElementById('taskCreated').textContent = new Date(task.createdAt).toLocaleString();
        
        document.getElementById('taskModal').style.display = 'block';
    }

    closeTaskModal() {
        document.getElementById('taskModal').style.display = 'none';
        this.currentTaskId = null;
    }

    saveTaskFromModal() {
        if (!this.currentTaskId) return;
        
        const newDescription = document.getElementById('taskDescription').value.trim();
        if (newDescription && this.updateTask(this.currentTaskId, { description: newDescription })) {
            this.closeTaskModal();
        }
    }

    deleteTaskFromModal() {
        if (!this.currentTaskId) return;
        
        if (confirm('Are you sure you want to delete this task?')) {
            this.deleteTask(this.currentTaskId);
            this.closeTaskModal();
        }
    }

    getStageDisplayName(stage) {
        const stageNames = {
            'todo': 'To Do',
            'progress': 'In Progress',
            'testing': 'Testing',
            'completed': 'Completed'
        };
        return stageNames[stage] || stage;
    }

    setupDragAndDrop() {
        const taskLists = document.querySelectorAll('.task-list');
        
        taskLists.forEach(list => {
            list.addEventListener('dragover', (e) => {
                e.preventDefault();
                list.classList.add('drag-over');
            });

            list.addEventListener('dragleave', () => {
                list.classList.remove('drag-over');
            });

            list.addEventListener('drop', (e) => {
                e.preventDefault();
                list.classList.remove('drag-over');
                
                const taskId = e.dataTransfer.getData('text/plain');
                const newStage = list.parentElement.dataset.stage;
                
                if (taskId && newStage) {
                    this.moveTask(taskId, newStage);
                }
            });
        });

        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('task-item')) {
                e.dataTransfer.setData('text/plain', e.target.dataset.taskId);
                e.target.classList.add('dragging');
            }
        });

        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('task-item')) {
                e.target.classList.remove('dragging');
            }
        });
    }
}

let scrumBoard;
document.addEventListener('DOMContentLoaded', () => {
    scrumBoard = new ScrumBoard();
});