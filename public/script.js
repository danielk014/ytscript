document.addEventListener('DOMContentLoaded', () => {
    console.log('PitchArchitect: DOM loaded, initializing...');
    
    // State management
    let currentStep = 1;
    let analysisData = null;
    let currentScript = '';

    // DOM elements
    const loadExamplesBtn = document.getElementById('loadExamples');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const generateBtn = document.getElementById('generateBtn');
    const copyScriptBtn = document.getElementById('copyScript');
    const proceedReviewBtn = document.getElementById('proceedReviewBtn');
    const viewMappingBtn = document.getElementById('viewMappingBtn');
    const startOverBtn = document.getElementById('startOverBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const improveScriptBtn = document.getElementById('improveScriptBtn');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingText = document.getElementById('loadingText');
    const successMessage = document.getElementById('successMessage');
    
    // Log missing elements
    const elements = {
        loadExamplesBtn, analyzeBtn, generateBtn, copyScriptBtn,
        proceedReviewBtn, viewMappingBtn, startOverBtn, downloadBtn,
        improveScriptBtn, loadingOverlay, loadingText, successMessage
    };
    
    for (const [name, element] of Object.entries(elements)) {
        if (!element) {
            console.error(`PitchArchitect: Missing element: ${name}`);
        }
    }

    // Workflow navigation
    const workflowSteps = document.querySelectorAll('.workflow-step');
    const stepContents = document.querySelectorAll('.step-content');

    // Analysis tabs
    const analysisTabs = document.querySelectorAll('.analysis-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // Initialize - moved to after function definitions

    // Workflow step navigation
    function updateWorkflowStep(step) {
        currentStep = step;
        
        // Update workflow nav
        workflowSteps.forEach((el, index) => {
            if (index + 1 <= step) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });

        // Update content sections
        stepContents.forEach((el, index) => {
            if (index + 1 === step) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    }

    // Analysis tab switching
    analysisTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            analysisTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });

    // Load example scripts
    if (loadExamplesBtn) {
        loadExamplesBtn.addEventListener('click', async () => {
            console.log('PitchArchitect: Loading examples...');
            try {
                const response = await fetch('/api/examples');
                console.log('PitchArchitect: Examples response status:', response.status);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const examples = await response.json();
                console.log('PitchArchitect: Examples loaded successfully');
                
                document.getElementById('script1').value = examples.script1;
                document.getElementById('script2').value = examples.script2;
                document.getElementById('topic').value = 'How to learn Spanish fast';
                document.getElementById('callToAction').value = 'Download my free Spanish conversation guide';
                
                showSuccess('Example scripts loaded!');
            } catch (error) {
                console.error('PitchArchitect: Error loading examples:', error);
                showSuccess('Failed to load examples: ' + error.message, 'error');
            }
        });
    } else {
        console.error('PitchArchitect: loadExamplesBtn not found!');
    }

    // Analyze scripts
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', async () => {
        const script1 = document.getElementById('script1').value.trim();
        const script2 = document.getElementById('script2').value.trim();
        const topic = document.getElementById('topic').value.trim();
        const targetLength = document.getElementById('targetLength').value.trim();
        const callToAction = document.getElementById('callToAction').value.trim();

        if (!script1 || !script2 || !topic || !callToAction) {
            showSuccess('Please fill in all fields', 'error');
            return;
        }

        showLoading('Analyzing scripts...');

        const formData = {
            script1,
            script2,
            topic,
            targetLength: parseTargetLength(targetLength),
            callToAction
        };

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            analysisData = await response.json();
            displayAnalysisResults(analysisData);
            updateWorkflowStep(2);
            hideLoading();
            
        } catch (error) {
            console.error('Error:', error);
            hideLoading();
            showSuccess('Failed to analyze scripts. Please try again.', 'error');
        }
    });
    } else {
        console.error('PitchArchitect: analyzeBtn not found!');
    }

    // Generate script
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            if (!analysisData) return;
            
            showLoading('Generating your script...');
            
            setTimeout(() => {
                currentScript = analysisData.script;
                displayGeneratedScript(analysisData.script);
                updateWorkflowStep(3);
                hideLoading();
            }, 1500);
        });
    } else {
        console.error('PitchArchitect: generateBtn not found!');
    }

    // Copy script
    copyScriptBtn.addEventListener('click', () => {
        const scriptContent = document.getElementById('generatedScript').textContent;
        navigator.clipboard.writeText(scriptContent).then(() => {
            showSuccess('Script copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
            showSuccess('Failed to copy script', 'error');
        });
    });

    // Proceed to review
    proceedReviewBtn.addEventListener('click', () => {
        // Make sure we have the current script
        if (!currentScript && analysisData && analysisData.script) {
            currentScript = analysisData.script;
        }
        displayReviewContent();
        updateWorkflowStep(4);
    });

    // View mapping
    viewMappingBtn.addEventListener('click', () => {
        // Show mapping in a modal or switch to review tab
        displayReviewContent();
        updateWorkflowStep(4);
    });

    // Start over
    startOverBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to start over? All progress will be lost.')) {
            location.reload();
        }
    });

    // Download script
    downloadBtn.addEventListener('click', () => {
        const scriptContent = document.getElementById('generatedScript').textContent;
        const topic = document.getElementById('topic').value;
        const filename = `${topic.replace(/\s+/g, '-').toLowerCase()}-script.txt`;
        
        const blob = new Blob([scriptContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        
        showSuccess('Script downloaded!');
    });

    // Helper functions
    function parseTargetLength(input) {
        if (input.includes('min')) {
            const minutes = parseInt(input);
            return minutes * 150; // 150 words per minute estimate
        }
        return parseInt(input) || 1400;
    }

    function showLoading(text = 'Loading...') {
        loadingText.textContent = text;
        loadingOverlay.classList.add('active');
    }

    function hideLoading() {
        loadingOverlay.classList.remove('active');
    }

    function showSuccess(message, type = 'success') {
        successMessage.textContent = message;
        successMessage.style.backgroundColor = type === 'error' ? '#EF4444' : '#10B981';
        successMessage.classList.add('active');
        
        setTimeout(() => {
            successMessage.classList.remove('active');
        }, 3000);
    }

    // Display functions
    function displayAnalysisResults(data) {
        // Display tactics counts
        document.getElementById('tactics1-count').textContent = data.analyses.script1.psychologicalTactics.length;
        document.getElementById('tactics2-count').textContent = data.analyses.script2.psychologicalTactics.length;
        
        // Display tactics tags
        const tactics1Tags = document.getElementById('tactics1-tags');
        const tactics2Tags = document.getElementById('tactics2-tags');
        
        tactics1Tags.innerHTML = '';
        tactics2Tags.innerHTML = '';
        
        data.analyses.script1.psychologicalTactics.forEach(tactic => {
            tactics1Tags.appendChild(createTacticTag(tactic));
        });
        
        data.analyses.script2.psychologicalTactics.forEach(tactic => {
            tactics2Tags.appendChild(createTacticTag(tactic));
        });
        
        // Display synthesized tactics
        displaySynthesizedTactics(data.synthesizedTactics);
        
        // Display blueprint
        displayBlueprint(data.blueprint);
    }

    function createTacticTag(tactic) {
        const tag = document.createElement('span');
        tag.className = `tactic-tag ${tactic.category}`;
        tag.textContent = tactic.name;
        return tag;
    }

    function displaySynthesizedTactics(tactics) {
        const container = document.getElementById('synthesized-tactics');
        container.innerHTML = '';
        
        tactics.forEach(([name, tactic]) => {
            const card = document.createElement('div');
            card.className = 'tactic-card';
            card.innerHTML = `
                <div class="tactic-card-header">
                    <span class="tactic-name">${name}</span>
                    <span class="tactic-category">${getCategoryName(tactic)}</span>
                </div>
                <p class="tactic-description">${getDescription(name)}</p>
            `;
            container.appendChild(card);
        });
    }

    function displayBlueprint(blueprint) {
        const container = document.getElementById('blueprint-content');
        container.innerHTML = '<h3>Script Blueprint</h3>';
        
        blueprint.forEach(section => {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'blueprint-section';
            sectionEl.innerHTML = `
                <h4>${section.section} (${section.timing})</h4>
                <p>Tactics: ${section.tactics.join(', ')}</p>
                <p>~${section.wordCount} words</p>
            `;
            container.appendChild(sectionEl);
        });
    }

    function displayGeneratedScript(script) {
        const scriptEl = document.getElementById('generatedScript');
        scriptEl.textContent = script;
        
        // Update word count
        const wordCount = script.split(/\s+/).length;
        document.getElementById('wordCount').textContent = wordCount;
    }

    function displayReviewContent() {
        if (!analysisData) return;
        
        // Display suggestions
        const suggestionsList = document.getElementById('suggestionsList');
        suggestionsList.innerHTML = '';
        
        analysisData.suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion.replace('💡 ', '');
            suggestionsList.appendChild(li);
        });
        
        // Display tactic mapping
        const mappingContainer = document.getElementById('tacticMapping');
        mappingContainer.innerHTML = analysisData.formattedMapping || '<p>No mapping data available</p>';
    }

    // Helper functions for tactic display
    function getCategoryName(tactic) {
        if (tactic.scripts) {
            return 'Found in both';
        }
        return 'Synthesized';
    }

    function getDescription(tacticName) {
        const descriptions = {
            'Pattern Interrupt': 'Breaks expected patterns to capture immediate attention',
            'Curiosity Gap': 'Creates information gaps that viewers feel compelled to fill',
            'Social Proof': 'Uses testimonials and success stories to build credibility',
            'Scarcity': 'Creates urgency through limited availability or time',
            'Authority': 'Establishes expertise and credibility through credentials',
            'Future Pacing': 'Helps viewers visualize their desired future state',
            'Direct Address': 'Speaks directly to viewer creating personal connection',
            'Open Loop': 'Starts stories without immediate resolution to maintain attention',
            'Reciprocity': 'Provides value first to create obligation to reciprocate',
            'Pain Point': 'Identifies and amplifies current frustrations'
        };
        
        return descriptions[tacticName] || 'Strategic tactic for engagement';
    }

    // Setup input toggles for YouTube URL feature
    function setupInputToggles() {
        const toggleBtns = document.querySelectorAll('.toggle-btn');
        
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.getAttribute('data-mode');
                const target = btn.getAttribute('data-target');
                
                // Update button states
                btn.parentElement.querySelectorAll('.toggle-btn').forEach(b => {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
                
                // Show/hide appropriate input
                if (mode === 'text') {
                    document.getElementById(target).classList.add('active');
                    document.getElementById(`${target}-url-container`).classList.remove('active');
                } else {
                    document.getElementById(target).classList.remove('active');
                    document.getElementById(`${target}-url-container`).classList.add('active');
                }
            });
        });
    }

    // Setup YouTube transcript fetchers
    function setupTranscriptFetchers() {
        const fetchBtns = document.querySelectorAll('.fetch-transcript-btn');
        
        fetchBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                const target = btn.getAttribute('data-target');
                const urlInput = document.getElementById(`${target}-url`);
                const url = urlInput.value.trim();
                
                if (!url) {
                    showSuccess('Please enter a YouTube URL', 'error');
                    return;
                }
                
                showLoading('Fetching transcript...');
                
                try {
                    const response = await fetch('/api/youtube-transcript', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ url })
                    });
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch transcript');
                    }
                    
                    const data = await response.json();
                    
                    // Check if we got a transcript or instructions
                    if (data.transcript) {
                        // Switch to text mode and insert transcript
                        const textBtn = document.querySelector(`.toggle-btn[data-mode="text"][data-target="${target}"]`);
                        textBtn.click();
                        
                        const textarea = document.getElementById(target);
                        textarea.value = data.transcript;
                        
                        hideLoading();
                        showSuccess(`Transcript fetched from: ${data.title}`);
                    } else if (data.instructions) {
                        // Show instructions for manual copying
                        hideLoading();
                        
                        // Create instruction modal
                        const instructionModal = document.createElement('div');
                        instructionModal.className = 'instruction-modal';
                        instructionModal.innerHTML = `
                            <div class="instruction-content">
                                <h3>📋 Manual Transcript Instructions</h3>
                                <p>Due to YouTube restrictions, please copy the transcript manually:</p>
                                <pre>${data.instructions}</pre>
                                <button class="btn-primary" onclick="this.parentElement.parentElement.remove()">Got it!</button>
                            </div>
                        `;
                        document.body.appendChild(instructionModal);
                        
                        // Open YouTube video in new tab
                        window.open(`https://youtube.com/watch?v=${data.videoId}`, '_blank');
                    }
                    
                } catch (error) {
                    console.error('Error fetching transcript:', error);
                    hideLoading();
                    showSuccess('Failed to fetch transcript. Make sure the video has captions.', 'error');
                }
            });
        });
    }

    // Improve script functionality
    if (improveScriptBtn) {
        improveScriptBtn.addEventListener('click', async () => {
            const checkboxes = document.querySelectorAll('.improvement-option input:checked');
            const improvements = Array.from(checkboxes).map(cb => cb.value);
            
            if (improvements.length === 0) {
                showSuccess('Please select at least one improvement', 'error');
                return;
            }
            
            showLoading('Improving your script...');
            
            try {
                const response = await fetch('/api/improve', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        script: currentScript,
                        improvements: improvements,
                        topic: document.getElementById('topic').value,
                        callToAction: document.getElementById('callToAction').value
                    })
                });
                
                if (!response.ok) {
                    throw new Error('Failed to improve script');
                }
                
                const data = await response.json();
                
                // Update the script display
                currentScript = data.improvedScript;
                displayGeneratedScript(currentScript);
                
                // Update word count
                document.getElementById('wordCount').textContent = data.wordCount;
                
                // Show improvements applied
                const improvementText = improvements.map(imp => {
                    const labels = {
                        'stronger-hook': 'Stronger Hook',
                        'more-emotional': 'Emotional Language',
                        'better-cta': 'Better CTA',
                        'add-stories': 'Story Examples'
                    };
                    return labels[imp];
                }).join(', ');
                
                hideLoading();
                showSuccess(`Applied improvements: ${improvementText}`);
                
                // Uncheck all boxes
                checkboxes.forEach(cb => cb.checked = false);
                
                // Switch back to Generation step to see the improved script
                updateWorkflowStep(3);
                
                // Update the generated script display on step 3
                const generatedScriptEl = document.getElementById('generatedScript');
                if (generatedScriptEl) {
                    generatedScriptEl.textContent = currentScript;
                }
                
            } catch (error) {
                console.error('Error improving script:', error);
                hideLoading();
                showSuccess('Failed to improve script', 'error');
            }
        });
    }

    // Update displayGeneratedScript to save current script
    const originalDisplayGeneratedScript = displayGeneratedScript;
    displayGeneratedScript = function(script) {
        currentScript = script;
        originalDisplayGeneratedScript(script);
    };

    // Setup Tactics Library functionality
    function setupTacticsLibrary() {
        const tacticsLibraryBtn = document.querySelector('.tactics-library-btn');
        const tacticsLibraryModal = document.getElementById('tacticsLibraryModal');
        
        if (!tacticsLibraryBtn || !tacticsLibraryModal) {
            console.warn('PitchArchitect: Tactics library elements not found');
            return;
        }
        
        const modalClose = tacticsLibraryModal.querySelector('.modal-close');
        const filterBtns = tacticsLibraryModal.querySelectorAll('.filter-btn');
        const tacticsLibraryContent = document.getElementById('tacticsLibraryContent');
        
        // All tactics data
        const allTactics = [
            { name: 'Pattern Interrupt', category: 'hook', description: 'Breaks expected patterns to grab attention instantly', effectiveness: 'Stops viewers from scrolling by disrupting their mental autopilot' },
            { name: 'Curiosity Gap', category: 'hook', description: 'Creates information gaps that viewers feel compelled to fill', effectiveness: 'Drives viewers to watch until the end to satisfy their curiosity' },
            { name: 'Social Proof', category: 'persuasion', description: 'Uses testimonials and success stories to build credibility', effectiveness: 'Builds trust by showing others have succeeded' },
            { name: 'Scarcity', category: 'persuasion', description: 'Creates urgency through limited availability or time', effectiveness: 'Motivates immediate action to avoid missing out' },
            { name: 'Authority', category: 'persuasion', description: 'Establishes expertise and credibility through credentials', effectiveness: 'Increases trust and compliance with recommendations' },
            { name: 'Future Pacing', category: 'emotional', description: 'Helps viewers visualize their desired future state', effectiveness: 'Creates emotional investment in the outcome' },
            { name: 'Direct Address', category: 'engagement', description: 'Speaks directly to viewer creating personal connection', effectiveness: 'Makes content feel like a 1-on-1 conversation' },
            { name: 'Open Loop', category: 'retention', description: 'Starts stories without immediate resolution', effectiveness: 'Keeps viewers watching to get closure' },
            { name: 'Reciprocity', category: 'persuasion', description: 'Provides value first to create obligation to reciprocate', effectiveness: 'Increases likelihood of viewer taking action' },
            { name: 'Pain Point Agitation', category: 'emotional', description: 'Identifies and amplifies current frustrations', effectiveness: 'Creates urgency to find a solution' },
            { name: 'Personal Story', category: 'narrative', description: 'Shares relatable experiences to build connection', effectiveness: 'Humanizes the content and builds trust' },
            { name: 'Transformation Promise', category: 'hook', description: 'Promises specific change or improvement', effectiveness: 'Gives viewers clear reason to watch' },
            { name: 'Specific Numbers', category: 'persuasion', description: 'Uses exact figures for credibility', effectiveness: 'Makes claims more believable and memorable' },
            { name: 'Time Constraint', category: 'retention', description: 'Mentions specific duration to set expectations', effectiveness: 'Reduces viewer anxiety about time commitment' },
            { name: 'Emotional Triggers', category: 'emotional', description: 'Targets core emotions like fear, joy, or anger', effectiveness: 'Creates strong viewer engagement and sharing' },
            { name: 'Problem-Solution Bridge', category: 'narrative', description: 'Clearly links problem to solution', effectiveness: 'Makes the value proposition crystal clear' },
            { name: 'Aspirational Identity', category: 'emotional', description: 'Appeals to who viewers want to become', effectiveness: 'Motivates through identity transformation' },
            { name: 'FOMO Creation', category: 'persuasion', description: 'Fear of missing out on opportunities', effectiveness: 'Drives immediate action through loss aversion' },
            { name: 'Metaphors and Analogies', category: 'narrative', description: 'Simplifies complex ideas through comparison', effectiveness: 'Makes content more memorable and understandable' },
            { name: 'Cliffhanger', category: 'retention', description: 'Ends sections with unresolved tension', effectiveness: 'Compels viewers to continue watching' },
            { name: 'Repetition for Emphasis', category: 'engagement', description: 'Repeats key points for memorability', effectiveness: 'Ensures main message sticks with viewer' },
            { name: 'Visual Language', category: 'engagement', description: 'Uses descriptive words to paint mental pictures', effectiveness: 'Makes content more engaging and memorable' },
            { name: 'Controversy Hook', category: 'hook', description: 'Challenges common beliefs or practices', effectiveness: 'Triggers engagement through strong reactions' },
            { name: 'Success Metrics', category: 'persuasion', description: 'Shows measurable results and outcomes', effectiveness: 'Provides concrete proof of effectiveness' },
            { name: 'Community Building', category: 'engagement', description: 'Creates sense of belonging to a group', effectiveness: 'Increases loyalty and long-term engagement' },
            { name: 'Exclusive Information', category: 'hook', description: 'Promises insider knowledge or secrets', effectiveness: 'Makes viewers feel special and privileged' },
            { name: 'Benefit Stacking', category: 'persuasion', description: 'Lists multiple benefits in succession', effectiveness: 'Overwhelms objections with value' },
            { name: 'Trust Signals', category: 'persuasion', description: 'Includes credentials, testimonials, guarantees', effectiveness: 'Reduces risk perception for viewers' },
            { name: 'Urgency Creation', category: 'retention', description: 'Creates time pressure for taking action', effectiveness: 'Prevents procrastination and drives action' },
            { name: 'Mental Models', category: 'narrative', description: 'Provides frameworks for understanding', effectiveness: 'Helps viewers organize and retain information' }
        ];
        
        // Display tactics
        function displayTactics(filter = 'all') {
            tacticsLibraryContent.innerHTML = '';
            
            const filteredTactics = filter === 'all' 
                ? allTactics 
                : allTactics.filter(tactic => tactic.category === filter);
            
            filteredTactics.forEach(tactic => {
                const card = document.createElement('div');
                card.className = 'tactic-library-card';
                card.innerHTML = `
                    <h3>${tactic.name}</h3>
                    <span class="category">${tactic.category}</span>
                    <p>${tactic.description}</p>
                    <p class="effectiveness">${tactic.effectiveness}</p>
                `;
                tacticsLibraryContent.appendChild(card);
            });
        }
        
        // Open modal
        tacticsLibraryBtn.addEventListener('click', () => {
            tacticsLibraryModal.classList.add('active');
            displayTactics('all');
        });
        
        // Close modal
        modalClose.addEventListener('click', () => {
            tacticsLibraryModal.classList.remove('active');
        });
        
        // Close on outside click
        tacticsLibraryModal.addEventListener('click', (e) => {
            if (e.target === tacticsLibraryModal) {
                tacticsLibraryModal.classList.remove('active');
            }
        });
        
        // Filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                displayTactics(filter);
            });
        });
    }

    // Setup Sign In functionality
    function setupSignIn() {
        const signInBtn = document.querySelector('.sign-in-btn');
        const signInModal = document.getElementById('signInModal');
        
        if (!signInBtn || !signInModal) {
            console.warn('PitchArchitect: Sign in elements not found');
            return;
        }
        
        const modalClose = signInModal.querySelector('.modal-close');
        const signInForm = document.getElementById('signInForm');
        const signUpLink = document.getElementById('signUpLink');
        
        // Open modal
        signInBtn.addEventListener('click', () => {
            signInModal.classList.add('active');
        });
        
        // Close modal
        modalClose.addEventListener('click', () => {
            signInModal.classList.remove('active');
        });
        
        // Close on outside click
        signInModal.addEventListener('click', (e) => {
            if (e.target === signInModal) {
                signInModal.classList.remove('active');
            }
        });
        
        // Handle form submission
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Show loading
            showLoading('Signing in...');
            
            // Simulate sign in process
            setTimeout(() => {
                hideLoading();
                signInModal.classList.remove('active');
                
                // Update UI to show signed in state
                signInBtn.textContent = email.split('@')[0];
                signInBtn.style.backgroundColor = 'var(--primary-color)';
                signInBtn.style.color = 'white';
                
                showSuccess('Successfully signed in!');
                
                // Reset form
                signInForm.reset();
            }, 1500);
        });
        
        // Handle sign up link
        signUpLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSuccess('Sign up feature coming soon!', 'info');
        });
    }

    // Initialize everything after all functions are defined
    console.log('PitchArchitect: Starting initialization...');
    try {
        updateWorkflowStep(1);
        console.log('PitchArchitect: Workflow step updated');
        
        setupInputToggles();
        console.log('PitchArchitect: Input toggles set up');
        
        setupTranscriptFetchers();
        console.log('PitchArchitect: Transcript fetchers set up');
        
        setupTacticsLibrary();
        console.log('PitchArchitect: Tactics library set up');
        
        setupSignIn();
        console.log('PitchArchitect: Sign in set up');
        
        console.log('PitchArchitect: Initialization complete!');
    } catch (error) {
        console.error('PitchArchitect: Initialization error:', error);
    }
});