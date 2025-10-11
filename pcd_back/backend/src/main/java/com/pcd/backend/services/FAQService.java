package com.pcd.backend.services;

import com.pcd.backend.model.FAQ;
import com.pcd.backend.repository.FAQRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FAQService {
    @Autowired
    private FAQRepository faqRepository;

    public List<FAQ> getAllFAQs() {
        return faqRepository.findAll();
    }

    public FAQ getFAQById(Long id) {
        return faqRepository.findById(id).orElse(null);
    }

    public FAQ createFAQ(FAQ faq) {
        faq.setId(null); // ← très important pour forcer la création
        return faqRepository.save(faq);
    }

    public FAQ updateFAQ(Long id, FAQ faqDetails) {
        FAQ faq = faqRepository.findById(id).orElse(null);
        if (faq != null) {
            faq.setQuestion(faqDetails.getQuestion());
            faq.setAnswer(faqDetails.getAnswer());
            return faqRepository.save(faq);
        }
        return null;
    }

    public void deleteFAQ(Long id) {
        faqRepository.deleteById(id);
    }
}
