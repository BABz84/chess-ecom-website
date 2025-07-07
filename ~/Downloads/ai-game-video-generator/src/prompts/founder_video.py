from string import Template

# This is a custom template for analyzing a "message from the founder" video.
# It's designed to identify moments of passion, key product features, and compelling storytelling.

HIGHLIGHT_PROMPT = Template('''
    Analyze the provided video of a founder talking about their passion for chess and their custom chess sets. The goal is to identify compelling moments suitable for a promotional video. The founder's name is "${username}".

    VARIABLES:
    - Founder's Name: "${username}"
    - Minimum Highlight Duration: ${min_highlight_duration_seconds} seconds

    OUTPUT REQUIREMENTS:
    - Output MUST be a JSON list of highlight objects.
    - If there are no significant moments, output an empty list [].
    - Each highlight object MUST contain:
        - "timestamp_start_seconds": number (integer, e.g., 55)
        - "timestamp_end_seconds": number (integer, e.g., 90)
        - "clip_description": string (e.g., "The founder passionately describes the craftsmanship of the king piece. CHECK1.")
    - After identifying a timestamp, replay it to ensure the entire highlight is encapsulated and accurate.

    VIDEO PROCESSING INSTRUCTIONS:
    1. Analyze the entire video before identifying timestamps.
    2. Prioritize moments of genuine passion, storytelling, and detailed product descriptions.
    3. Focus on the speaker's words and emotional tone.
    4. (CRITICAL) When watching the video, note timestamps of significant moments from the founder, "${username}".

    HIGHLIGHT IDENTIFICATION CRITERIA (Strictly Adhere):

    A. CONTENT TO INCLUDE (ONLY these moments qualify as highlights):
        1.  **Expressions of Passion:** Moments where the founder's voice is filled with excitement, passion, or deep conviction about their craft or chess.
        2.  **Storytelling:** Anecdotes about the company's origin, the inspiration behind a design, or the founder's personal connection to chess.
        3.  **Key Feature Explanations:** Clear, concise descriptions of what makes the chess sets unique (e.g., materials, craftsmanship, design details).
        4.  **Call to Action:** Direct or indirect invitations to purchase, learn more, or engage with the brand.
        5.  **Customer-Focused Moments:** Mentions of customer stories, testimonials, or the value the product brings to chess lovers.

    B. TIMESTAMPING RULES (CRITICAL):
        1. All timestamps MUST be in total SECONDS (e.g., 90 for 1:30).
        2. Each individual highlight segment MUST be at least ${min_highlight_duration_seconds} seconds long.
        3. Add a 1-second buffer BEFORE the start of the compelling moment.
        4. Add a 2-second buffer AFTER the end of the compelling moment to allow it to breathe.
        5. If multiple distinct highlight-worthy moments occur but are separated by significant pauses or less relevant content, create separate highlight entries for each.

    C. CONTENT TO EXCLUDE (DO NOT INCLUDE any of the following):
        1.  Any moments of hesitation, filler words ("um", "ah"), or long, unnatural pauses.
        2.  Off-topic remarks not related to the chess sets, the brand, or the founder's passion.
        3.  Technical issues, stumbles, or mistakes in the recording.
        4.  Any content that does not align with a premium, passionate brand image.

    D. CONTENT TO CUT OUT/SHORTEN:
        1.  Any moments where the founder is not speaking or demonstrating a product feature. This includes:
            - General pauses.
            - Moments of setting up or preparing.

    VERIFICATION STEP (For your internal process before finalizing output):
    - For each potential highlight:
        1. Confirm "${username}" is the one speaking and the focus of the moment. Include "CHECK1" in the `clip_description` to confirm this check.
        2. Verify the timestamp adheres to all buffer and minimum duration rules.
        3. Ensure no excluded content is present.
        4. After every other step is done, verify that there is no excessive downtime in the clip. If there is, trim down the video. If there are more parts to the highlight, please expand the highlighted timestamps.

    EXAMPLE HIGHLIGHT FORMAT:
    [
      {
        "timestamp_start_seconds": 55,
        "timestamp_end_seconds": 90,
        "clip_description": "The founder passionately describes the unique weighting of the pieces and the story behind the design. CHECK1."
      },
      {
        "timestamp_start_seconds": 120,
        "timestamp_end_seconds": 145,
        "clip_description": "A compelling call to action where the founder invites viewers to experience the craftsmanship firsthand. CHECK1."
      }
    ]
    ''')
