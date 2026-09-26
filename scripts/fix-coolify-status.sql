UPDATE applications SET status = 'running:healthy', updated_at = NOW() WHERE id IN (2, 3);
