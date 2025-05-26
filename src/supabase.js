// /src/supabase.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wiencnwapdxocnanjchh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpZW5jbndhcGR4b2NuYW5qY2hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MTA1NDQsImV4cCI6MjA2MzE4NjU0NH0.5AYz1Tr2OZYY7RKyZ93cm8PVESH3JQf8BAgsC8iwc4A'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase