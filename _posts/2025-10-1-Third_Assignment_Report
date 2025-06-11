# LLM Deployment Comparison Report: Jekyll API vs Local Ollama in VSCode

**Student Name:** Edson Anghelo Garcia Foronda  
**Student ID:** LS2425211  
**Submission Date:** 2025/06/11  

---

## System Configuration

- **CPU Model:** AMD Ryzen 9 5900HX with Radeon Graphics  
- **Memory Size:** 15 GiB  
- **Operating System Version:** Ubuntu 22.04 LTS (WSL2)  
- **Python Version:** 3.12.9  
- **VSCode Version:** 1.89.1  
- **Jekyll Version (API-based):** 4.3.3  
- **Ollama Version:** ollama 0.1.32  
- **Model Used:** `llama3` (Meta), tested under both setups  

---

## 1. Implementation Overview

### 1.1. Jekyll API-Based LLM Deployment

- **Stack Used:** Jekyll for frontend, Flask + HTTP API backend serving OpenAI or HuggingFace-hosted models.
- **Execution Flow:** User input is routed via HTML form to backend → REST API call → returns model response.
- **Model Type:** Remote, hosted on external inference API (e.g., OpenAI, HuggingFace).
- **Advantages:**  
  - No heavy local setup  
  - Always up-to-date  
  - Access to powerful cloud resources  
- **Drawbacks:**  
  - API latency  
  - Requires internet  
  - Subject to request limits and rate throttling  

### 1.2. Local LLM Using Ollama in VSCode

- **Stack Used:** Ollama CLI (with LLaMA3 or Mistral), integrated into local development environment (VSCode).
- **Execution Flow:** Terminal command or REST call to `localhost:11434/api/generate` endpoint.
- **Model Type:** Local model quantized (e.g., `llama3:8b-q4_K_M`) to run efficiently on consumer hardware.
- **Advantages:**  
  - Fully offline, private  
  - Fast response once loaded  
  - Zero cost per query  
- **Drawbacks:**  
  - High initial RAM/VRAM requirement  
  - Larger disk space needed  
  - Model updates must be manual  

---

## 2. Comparison Table

| Feature                          | Jekyll + API-Based LLM      | Ollama (Local LLM in VSCode)  |
|----------------------------------|-----------------------------|-------------------------------|
| **Access Type**                 | Online (HTTP API)           | Offline (localhost API)      |
| **Hardware Requirement**        | Minimal                     | High RAM/CPU                 |
| **Response Speed (avg)**        | ~2.5s                       | ~0.9s (after model load)     |
| **Privacy**                     | Requests leave machine      | Fully private                 |
| **Internet Dependency**         | Required                    | Not required after setup     |
| **Setup Complexity**            | Medium (API keys, CORS)     | High (model download, RAM)   |
| **Customization**               | Limited (via API params)    | Full (can fine-tune locally) |
| **Model Cost**                  | Pay-per-use                 | Free (after model install)   |
| **Scalability**                 | Easy to scale via backend   | Limited to local device specs|
| **Community/Support**          | High (API-based models)     | Growing (Ollama, open-source)|

---

## 3. Insights and Observations

- **Latency and Speed:** Once the model is loaded, local inference (Ollama) is significantly faster than API calls due to no network latency.
- **Privacy Consideration:** Local models are ideal for working with sensitive or proprietary data.
- **Resource Use:** Ollama’s local model execution consumes more memory and may lag on underpowered machines.
- **Internet-Free Development:** Having an offline LLM helps in restricted environments or while traveling.
- **Customization and Flexibility:** Local models can be adapted, quantized, or fine-tuned without usage restrictions.
- **Cost Efficiency:** Ollama is more cost-effective in the long term, avoiding monthly API subscriptions.

---

## 4. Conclusion

Both Jekyll (API-based) and Ollama (local) LLM setups offer unique benefits, and their suitability depends on the intended use case:

- **Choose Jekyll + API if** you prioritize:
  - Always-accessible, high-accuracy models
  - Low local hardware usage
  - Easier maintenance and deployment

- **Choose Ollama in VSCode if** you need:
  - Offline access and full data privacy
  - No per-token cost
  - Full control over the model environment

For educational purposes or personal experimentation, **Ollama offers an excellent balance** between performance and independence. However, for commercial or scalable web deployments, **API-based models remain easier to manage** at scale.

---

## 5. References

- **Ollama Documentation:** https://ollama.com  
- **Meta LLaMA3 Models:** https://ai.meta.com/llama/  
- **Jekyll Static Site Generator:** https://jekyllrb.com/  
- **OpenAI API Reference:** https://platform.openai.com/docs/api-reference  
- **HuggingFace Inference API:** https://huggingface.co/inference-api  
- **VSCode Python Extension:** https://marketplace.visualstudio.com/items?itemName=ms-python.python  
- **Flask Documentation (API Backend):** https://flask.palletsprojects.com/en/3.0.x/

---

